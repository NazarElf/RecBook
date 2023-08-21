import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../actions/recipes';

function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
}

const CreateRecipeForm = () => {
    const [recipeData, setRecipeData] = useState({
        name: '', order: '', picture: '', ingridients: ''
    })
    const dispatch = useDispatch()

    const handleClear = () => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeToSend = {...recipeData}
        recipeToSend.ingridients = [1,2]
        
        console.log("sending recipe: ",recipeToSend)

        dispatch(createRecipe(recipeToSend))
    }

    return (
        <div>
            <h1>Create Recipe Form</h1>
            <form>
                <h4>Recipe Name:</h4>
                <input
                    type="text"
                    id="name" value={recipeData.name}
                    onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}></input>
                <h4>Creation Order:</h4>
                <textarea
                    name="order"
                    value={recipeData.order}
                    onChange={(e) => setRecipeData({ ...recipeData, order: e.target.value })}></textarea>
                <h4>Upload Image:</h4>
                <div>
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=> setRecipeData({...recipeData, picture: base64})}
                    />
                </div>
                <h4>Ingridients:</h4>
                <div>Not implemented yet :(</div>

                <input type="submit" value="Create Recipe" onClick={handleSubmit}/>
                <button onClick={handleClear}>Clear</button>
            </form>
        </div>
    )
}

export default CreateRecipeForm;