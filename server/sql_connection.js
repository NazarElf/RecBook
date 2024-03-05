import * as mysql from 'mysql';

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "crud_user",
    port:3306,
    password: "StrongRecBook74_Pass",
    database: "recbook"
})

export const getFilter = (products = [], filters = []) =>
{
    let where_placeholder = [' ', [...Array(filters.length).fill('rt.recipe_type_id = ?')].join(' OR ')].filter(Boolean).join('WHERE ')
    
    if(!products.length)
    {
        console.log(where_placeholder)
        return mysql.format( 'SELECT recipe_id as id, r.name AS name, description, rt.name AS recipe_type, rt.recipe_type_id FROM recipe AS r ' +
        'LEFT JOIN `Recipe_Type` AS rt ON r.recipe_type_id = rt.recipe_type_id' + where_placeholder, filters)
    }
    
    let products_placeholder = products.map(pr => '?').join(',')
    let products_filter = products.filter(Number).map(Number)
    return mysql.format(`SELECT recipe_id as id, name, description, recipe_type, recipe_type_id FROM 
    (
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