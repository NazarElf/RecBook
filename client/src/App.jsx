import React from "react";
import Recipes from './components/Recipes/Recipes'
import CreateRecipeForm from "./components/CreateRecipeForm/CreateRecipeForm";

const App = () => 
{
    return (
        <div>
            <h1>App</h1>
            <CreateRecipeForm/>
            <Recipes/>
        </div>
    )
}

export default App;