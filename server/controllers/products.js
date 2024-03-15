import { connection } from "../sql_connection.js";
import * as product from '../models/productMessage.js'

export const fetchAllProducts = (req, res) => {
    connection.query(`SELECT
        product_id AS ${product.product_id_field}, 
        name AS ${product.product_name_field}, 
        p.type_id AS ${product.product_type_id_field}, 
        type_name AS ${product.product_type_field}
    FROM Product AS p LEFT JOIN Product_Type AS pt ON p.type_id = pt.type_id ORDER BY p.type_id, name`,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
                return
            }
            res.status(200).json(results)
        })
}

function parseProductsForOneRecipe(results) {
    let res = []
    results.forEach(result => {
        let { [product.product_alter_field]: alter_products, ...current_res } = result;
        if (alter_products) {
            let t = res.find(element => element[product.product_id_field] == current_res[product.product_id_field])
            if (t) {
                t[product.product_alter_field].push(result[product.product_alter_field])
                return
            }
            res.push({ ...current_res, [product.product_alter_field]: [result[product.product_alter_field]] });
            return
        }
        res.push(current_res)
    })
    return res;
}

export const fetchProductsByRecipe = (req, res) => {
    const { id: _id } = req.params;
    const query =
    {
        sql:
            `SELECT 
                p.product_id AS ${product.product_id_field}, 
                p.name AS ${product.product_name_field}, 
                p.type_id AS ${product.product_type_id_field}, 
                pt.type_name AS ${product.product_type_field}, 
                rp.quantity AS ${product.product_quantity_field},
                alt_p.name as ${product.product_alter_field}
            FROM Recipe AS r 
            INNER JOIN Recipe_Product AS rp ON r.Recipe_ID = rp.Recipe_ID 
            LEFT JOIN Product AS p ON rp.Product_ID = p.Product_ID
            LEFT JOIN Product_Type AS pt ON pt.Type_ID = p.Type_ID
            LEFT JOIN Product_Alternitives AS pa ON rp.Recipe_Product_ID = pa.Recipe_Product_ID
            LEFT JOIN Product AS alt_p ON alt_p.Product_ID = pa.Product_ID
            WHERE r.recipe_id = ?`}
    connection.query(query, _id,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
            }

            res.status(200).json(parseProductsForOneRecipe(results))
        })
}