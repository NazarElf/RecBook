import * as api from '../api';

//action creators
export const getRecipes = () => async (dispatch) =>
{
    try {
        const {data} = await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
}