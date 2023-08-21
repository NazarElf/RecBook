import React, { useEffect } from "react";
import Recipes from './components/Recipes/Recipes'
import CreateRecipeForm from "./components/CreateRecipeForm/CreateRecipeForm";
import { useDispatch } from "react-redux";

import { getRecipes } from "./actions/recipes";
import './App.css'

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])
    return (
        <div>
            <h1>App</h1>
            <CreateRecipeForm />
            <Recipes />
        </div>
    )
}

export default App;