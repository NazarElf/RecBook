import * as api from '../api'

export const getIngridients = () => async (dispatch) =>
{
    try {
        const {data} = await api.fetchIngridients();
        dispatch({type: 'FETCH_INGRIDIENTS', payload: data})
    } catch (error) {
        console.log(error)
    }
}