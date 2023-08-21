import * as api from '../api';

//action creators
export const getRecipes = () => async (dispatch) =>
{
    try {
        const {data} = await api.fetchRecipes();
        dispatch({type:'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createRecipe = (recipe) => async (dispatch)=>
{
    try {
        const {data} = await api.createRecipe(recipe)
        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}