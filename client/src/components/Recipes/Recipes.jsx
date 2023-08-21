import React from 'react';
import Recipe from '../Recipe/Recipe';
import { useSelector } from 'react-redux';


const Recipes = () => {
    const recipes = useSelector((state) => state.recipes)

    console.log(recipes);

    return (
        <div>
            <h1>RECIPES</h1>
            <Recipe />
            <Recipe />
        </div>
    )
}

export default Recipes;