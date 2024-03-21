import React from 'react';
import Recipe from '../Recipe/Recipe';
import { useSelector } from 'react-redux';


const Recipes = () => {
    const recipes = useSelector((state) => state.recipes)


    return (
        <div>
            <h1>RECIPES</h1>
            {recipes.map((recipe, i) => {
                return <Recipe
                    key={i}
                    name={recipe.name}
                    order={recipe.order}
                    picture={recipe.picture}
                    ingridients={recipe.ingridients}
                />
            })}
        </div>
    )
}

export default Recipes;