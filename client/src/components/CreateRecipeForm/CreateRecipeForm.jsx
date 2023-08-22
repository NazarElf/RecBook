import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../actions/recipes';

const defaultState = { name: '', order: '', picture: '', ingridients: '' }

const CreateRecipeForm = () => {
    const [recipeData, setRecipeData] = useState(defaultState)
    const dispatch = useDispatch()

    const handleClear = (e) => {
        console.log(recipeData)
        e.preventDefault();
        setRecipeData(defaultState)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (recipeData.name == 0 || recipeData.order == 0 || recipeData.picture == 0)
            return;

        const recipeToSend = { ...recipeData }
        recipeToSend.ingridients = [{ id: 1, quantity: 0.5, muType: "kilo" }]


        dispatch(createRecipe(recipeToSend))
        handleClear(e)
    }

    return (
        <div>
            <h1>Create Recipe Form</h1>
            <form>
                <h4>Recipe Name:</h4>
                <input
                    required
                    type="text"
                    id="name" value={recipeData.name}
                    onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}></input>
                <h4>Creation Order:</h4>
                <textarea
                    required
                    name="order"
                    value={recipeData.order}
                    onChange={(e) => setRecipeData({ ...recipeData, order: e.target.value })}></textarea>
                <h4>Upload Image:</h4>
                <div>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setRecipeData({ ...recipeData, picture: base64 })}
                    />
                </div>
                <h4>Ingridients:</h4>
                <div>Not implemented yet :(</div>

                <input type="submit" value="Create Recipe" onClick={handleSubmit} />
                <button onClick={handleClear}>Clear</button>
            </form>
        </div>
    )
}

export default CreateRecipeForm;