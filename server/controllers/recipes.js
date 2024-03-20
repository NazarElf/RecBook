import { connection, getFilter } from "../sql_connection.js"
import Recipe from "../models/recipeMessage.js";
import * as recipe from "../models/recipeMessage.js"

function responseWithError(res, error) {
    console.log(error)
    res.status(501).json({ message: error.message })
}

function arrayFromString(str) {
    return str?.split(',').filter(Number).map(Number) || []
}

export const getRecipes = (req, res) => {
    let queries = req.query;

    let types = arrayFromString(queries.types)
    let products = arrayFromString(queries.products)
    let sql_query_string = getFilter(products, types)

    connection.query(sql_query_string,
        async function (error, results, fields) {
            if (error) {
                res.status(404).json({ message: error.message })
                console.log(error)
            }
            else {
                if (!req.user)
                    results = results.filter(r => r.id !== 1)
                res.status(200).send(results)
            }
        })
}

export const checkUser = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: "You must login to perform this action" })
    }
    next()
}

export const createRecipe = async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const recipe = req.body;

    const newRecipe = new Recipe(recipe.name, recipe.description, recipe.cooking_order, recipe.recipe_type_id, req.user.id);

    try {
        connection.beginTransaction(function (err) {
            if (err) responseWithError(res, err)
            connection.query('INSERT INTO `Recipe` SET ?', newRecipe, function (error, results, fields) {
                if (error) { return connection.rollback(function () { responseWithError(res, error) }) }

                let in_id = results.insertId
                let recipe_product = recipe.products.map(prod => [in_id, prod.id, prod.quantity]);
                connection.query('INSERT INTO `Recipe_Product` (recipe_id, product_id, quantity) VALUES ?', [recipe_product], function (error, results, fields) {
                    if (error) return connection.rollback(function () { responseWithError(res, error) })
                    connection.commit(function (err) {
                        if (err) return connection.rollback(function () { responseWithError(res, error) })

                        res.status(201).json({ id: in_id })
                    })
                })
            })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const checkValidity = async (req, res, next) => {
    let { id: _id } = req.params;
    let user_id = (await connection.promise().query(`SELECT user_created_id FROM recipe WHERE recipe_id = ?`, [_id]))[0][0]
    if(!user_id){
        return res.status(404).json({message: "Recipe not found"})
    }
    if(user_id.user_created_id !== req.user.id)
    {
        return res.status(403).json({message: "You must be owner of this recipe to perform this action"})
    }
    next()
}

export const updateRecipe = (req, res) => {
    const { id: _id } = req.params;
    const recipe = req.body;
    const updateRecipe = new Recipe(recipe.name, recipe.description, recipe.cooking_order, recipe.recipe_type_id, recipe.creatorID);

    connection.beginTransaction(function (err) {
        if (err) connection.rollback(function () { responseWithError(res, err) })
        {
            connection.query('DELETE FROM `Recipe_Product` WHERE recipe_id = ?', [_id], function (error) {
                if (error) connection.rollback(function () { responseWithError(res, error) })
                else connection.query('UPDATE `Recipe` SET ? WHERE recipe_id = ?', [updateRecipe, _id], function (error) {
                    if (error) connection.rollback(function () { responseWithError(res, error) })
                    else {
                        let recipe_product = recipe.products.map(prod => [_id, prod.id, prod.quantity]);
                        connection.query('INSERT INTO `Recipe_Product` (recipe_id, product_id, quantity) VALUES ?', [recipe_product], function (error) {
                            if (error) connection.rollback(function () { responseWithError(res, error) })
                            else connection.commit(function (err) {
                                if (err) connection.rollback(function () { responseWithError(res, err) })
                                else res.status(200).json({ message: 'ok' })
                            })
                        })
                    }
                })
            })
        }
    })
}

export const deleteRecipe = (req, res) => {
    const { id: _id } = (req.params);
    try {
        connection.beginTransaction(function (err) {
            if (err) responseWithError(res, err)
            connection.query('DELETE FROM `Recipe_Product` WHERE Recipe_ID = ?', [_id], function (error) {
                if (error) connection.rollback(function () { responseWithError(res, error) })
                connection.query('DELETE FROM `Recipe` WHERE Recipe_ID = ?', [_id], function (error) {
                    if (error) connection.rollback(function () { responseWithError(res, error) })
                    connection.commit(function (err) {
                        if (err) connection.rollback(function () { responseWithError(res, err) })
                        res.status(200).json({ message: `deleted with id ${_id}` })
                    })
                })
            })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

export const fetchOneRecipe = (req, res) => {
    const { id: _id } = req.params;
    connection.query(
        `SELECT 
            r.recipe_id AS ${recipe.recipe_id_field}, 
            r.name AS ${recipe.recipe_name_field}, 
            r.description AS ${recipe.recipe_description_field}, 
            r.cooking_order AS ${recipe.recipe_cooking_order_field}, 
            rt.name AS ${recipe.recipe_type_id_field}, 
            rt.recipe_type_id AS ${recipe.recipe_type_id_field}
        FROM recipe AS r 
        LEFT JOIN \`Recipe_Type\` AS rt ON r.recipe_type_id = rt.recipe_type_id
        
        WHERE Recipe_ID = ?`, _id,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
                return
            }
            if (!results.length) {
                res.status(404).json({ message: "Specific recipe not found" })
                return
            }
            res.status(200).json(results[0])
        })
}