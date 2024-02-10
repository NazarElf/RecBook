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