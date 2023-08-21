import React from 'react';
import Recipe from '../Recipe/Recipe';
import { useSelector } from 'react-redux';


const Recipes = () => {
    const recipes = useSelector((state) => state.recipes)
    const ingridients = useSelector((state) => state.ingridients)

    console.log("recipes: ", recipes);
    console.log("ingridients: ", ingridients);

    return (
        <div>
            <h1>RECIPES</h1>
            <Recipe />
            <Recipe />
        </div>
    )
}

export default Recipes;