const ingridients = (state = [], action) =>
{
    switch(action.type)
    {
        case 'FETCH_INGRIDIENTS':
            return action.payload;
        default:
            return state;
    }
}

export default ingridients;