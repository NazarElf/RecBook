import { connection } from "../sql_connection.js";

export const fetchAllProducts = (req, res) => {
    connection.query(`SELECT product_id, name, p.type_id, type_name FROM Product AS p LEFT JOIN Product_Type AS pt ON p.type_id = pt.type_id ORDER BY p.type_id, name`,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
                return
            }
            res.status(200).json(results)
        })
}

export const fetchProductsByRecipe = (req, res) => {
    const { id: _id } = req.params;
    const query =
    `SELECT p.product_id, p.name, p.type_id, pt.type_name, rp.quantity, u.name as unit_name, alt_p.name as alternitive_product_name FROM Recipe AS r 
    INNER JOIN Recipe_Product AS rp ON r.Recipe_ID = rp.Recipe_ID 
    LEFT JOIN Product AS p ON rp.Product_ID = p.Product_ID
    LEFT JOIN Unit AS u ON u.Unit_ID = rp.Unit_ID
    LEFT JOIN Product_Type AS pt ON pt.Type_ID = p.Type_ID
    LEFT JOIN Product_Alternitives AS pa ON rp.Recipe_Product_ID = pa.Recipe_Product_ID
    LEFT JOIN Product AS alt_p ON alt_p.Product_ID = pa.Product_ID
    WHERE r.recipe_id = ?`
    connection.query(query, _id,
        function(error, results, fields)
        {
            console.log(">>>")
            if(error)
            {
                console.log(error)
                res.status(400).json({message: error.message})
            }
            res.status(200).json(results)
        })
}