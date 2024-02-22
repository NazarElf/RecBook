import React from 'react'
import { useLoaderData } from 'react-router-dom'
import * as api from '../../api/index.ts'
import type { RecipeDetails as Details } from '../../interfaces/dataTypes.ts'


export async function loader({ params }) {
    const { data } = await api.fetchOneRecipe(Number(params.id))
    return { recipe: data };
}

const RecipeDetails = () => {
    
    const { recipe } = useLoaderData() as { recipe: Details }
    console.log(recipe)

    if (recipe)
        return (
            <div>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <p>{recipe.cooking_order}</p>
                <p>{recipe.recipe_type}</p>
                <p>{recipe.user_created_id}</p>
            </div>
        )
    return (<div>Recipe not found</div>)
}

export default RecipeDetails;