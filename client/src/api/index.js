import axios from 'axios';

const url = 'http://localhost:5000/recipes'
const ingridients = 'http://localhost:5000/ingridients'

export const fetchRecipes = () => axios.get(url);
export const fetchIngridients = () => axios.get(ingridients);