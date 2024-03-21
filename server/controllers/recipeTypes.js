import { connection } from "../sql_connection.js";
import * as recipeType from '../models/recipeTypeMessage.js'

export const getRecipeTypes = (req, res) => {
    connection.query(`SELECT Recipe_Type_ID as ${recipeType.recipe_type_id_field}, name AS ${recipeType.recipe_type_name_field} FROM \`Recipe_Type\``,
        function (error, results, fields) {
            if(error)
            {
                console.log(error)
                res.status(400).json({message: error.message})
                return
            }
            res.status(200).json(results)
        })
}