export default (recipes = [], action) =>
{
    switch(action.type)
    {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return recipes;
        default:
            return recipes;
    }
}