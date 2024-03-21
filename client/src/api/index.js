import axios from 'axios';

const recipesUrl = 'http://localhost:5000/recipes'
const ingridientsUrl = 'http://localhost:5000/ingridients'

export const fetchRecipes = () => axios.get(recipesUrl);
export const createRecipe = (newPost) => axios.post(recipesUrl, newPost)
export const fetchIngridients = () => axios.get(ingridientsUrl);
