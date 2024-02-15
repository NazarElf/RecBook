import * as api from '../api'

//action creatores
export const getRecipes = () => async (dispatch) =>
{
    try{
        const {data} = await api.fetchRecipes()
        dispatch({type: 'FETCH_ALL', payload: data});
    }
    catch (error){
        console.log(error)
    }
}

export const createRecipe = (recipe) => async (dispatch) =>
{
    try{
        console.log('start await')
        const {data} = await api.createRecipe(recipe)
        console.log(data)
        dispatch({type: 'CREATE', payload: data})
    }
    catch (error)
    {
        console.log(error)
    }
}