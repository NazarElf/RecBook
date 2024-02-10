import React from "react";
import { useSelector } from "react-redux";
import Recipe from "./Recipe";

const Recipes = () => {
    const recipes = useSelector((state) => state.recipes)

    console.log(recipes)

    return (
        <>
            <h1>RECIPES</h1>
            <Recipe />
            <Recipe />
        </>
    )
}

export default Recipes;