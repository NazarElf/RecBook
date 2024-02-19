import axios from 'axios'
import type { Recipe } from '../interfaces/dataTypes'

const url = 'http://localhost:5000/recipes'

export const fetchRecipes = () => axios.get<Recipe[]>(url)
export const createRecipe = (newRecipe) => axios.post<Recipe>(url, newRecipe)
export const updateRecipe = (id, updRecipe) => axios.patch<Recipe>(`${url}/${id}`, updRecipe)
export const removeRecipe = (id) => axios.delete(`${url}/${id}`)