import React from 'react'
import { useLoaderData } from 'react-router-dom'
import * as api from '../../api/index.ts'
//import type { Recipe } from '../../interfaces/dataTypes'
//import { useLoaderData } from 'react-router-dom'


export async function loader({ params }) {
    //console.log( === 1)
    const {data}= await api.fetchOneRecipe(Number(params.id))
    return { recipe: data };
}

const RecipeDetails = () => {
    /* @ts-ignore */
    const {recipe} = useLoaderData()
    console.log(recipe)

    if (recipe)
        return (
            <div>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <p>{recipe.cooking_order}</p>
                <p>{recipe.recipe_type_id}</p>
                <p>{recipe.user_created_id}</p>
            </div>
        )
    return (<div>Recipe not found</div>)
}

export default RecipeDetails;