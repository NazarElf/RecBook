import * as mysql from 'mysql2';
import * as recipe from './models/recipeMessage.js'
import * as dotenv from 'dotenv'

dotenv.config()

export const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    port: process.env.SQL_PORT,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
})

export const getFilter = (products = [], filters = []) =>
{
    let where_placeholder = [' ', [...Array(filters.length).fill('rt.recipe_type_id = ?')].join(' OR ')].filter(Boolean).join('WHERE ')
    
    if(!products.length)
    {
        return mysql.format( `SELECT recipe_id as ${recipe.recipe_id_field}, 
          r.name AS ${recipe.recipe_name_field}, 
          description AS ${recipe.recipe_description_field}, 
          rt.name AS ${recipe.recipe_type_name_field}, 
          rt.recipe_type_id AS ${recipe.recipe_type_id_field} 
        FROM recipe AS r 
        LEFT JOIN \`Recipe_Type\` AS rt ON r.recipe_type_id = rt.recipe_type_id` + where_placeholder, filters)
    }
    
    let products_placeholder = products.map(pr => '?').join(',')
    let products_filter = products.filter(Number).map(Number)
    return mysql.format(`SELECT 
      recipe_id as ${recipe.recipe_id_field}, 
      name AS ${recipe.recipe_name_field}, 
      description AS ${recipe.recipe_description_field}, 
      recipe_type AS ${recipe.recipe_type_name_field}, 
      recipe_type_id AS ${recipe.recipe_type_id_field} 
    FROM (
      SELECT r.recipe_id, r.Name AS 'name', r.description, rt.Name AS 'recipe_type', rt.recipe_type_id,
        CASE 
        WHEN SUM(
            CASE 
          WHEN p2.Product_ID IN (${products_placeholder}) THEN 1 
          WHEN p.Product_ID in (${products_placeholder}) THEN 1 
          ELSE 0 END) > 0 THEN 1 
        ELSE 0 END AS mysum
      FROM Recipe AS r
      LEFT JOIN Recipe_Product AS rp
      ON r.Recipe_ID = rp.Recipe_ID
      LEFT JOIN Product AS p
      ON rp.Product_ID = p.Product_ID
      LEFT JOIN Product_Alternitives AS pa
      ON rp.Recipe_Product_ID = pa.Recipe_Product_ID
      LEFT JOIN Product AS p2
      ON pa.Product_ID = p2.Product_ID
      LEFT JOIN Recipe_Type AS rt
      ON rt.Recipe_Type_ID = r.Recipe_Type_ID
     ${where_placeholder}
      GROUP BY r.Recipe_ID, p.Product_ID
    ) AS mysum_table
    GROUP BY Recipe_ID
    HAVING SUM(mysum) = COUNT(1)`, [...products_filter, ...products_filter, ...filters])
}

//crud_user@127.0.0.1:3306