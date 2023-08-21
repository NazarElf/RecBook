const recipes = (recipes = [], action) =>
{
    switch(action.type)
    {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...recipes, action.payload];
        default:
            return recipes;
    }
}

export default recipes;