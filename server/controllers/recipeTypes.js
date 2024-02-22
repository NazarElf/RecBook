import { connection } from "../sql_connection.js";

export const getRecipeTypes = (req, res) => {
    connection.query("SELECT Recipe_Type_ID as id, name FROM `Recipe_Type`",
        function (error, results, fields) {
            if(error)
            {
                console.log(error)
                res.status(400).json({message: error.message})
                return
            }
            console.log(results)
            res.status(200).json(results)
        })
}