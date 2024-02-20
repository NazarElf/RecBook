import axios from 'axios'
import type { Recipe } from '../interfaces/dataTypes'

const url = 'http://192.168.0.112:5000/recipes'

export const fetchRecipes = () => axios.get<Recipe[]>(url)
export const createRecipe = (newRecipe: Recipe) => axios.post<Recipe>(url, newRecipe)
export const updateRecipe = (id: number, updRecipe: Recipe) => axios.patch<Recipe>(`${url}/${id}`, updRecipe)
export const removeRecipe = (id: number) => axios.delete(`${url}/${id}`)
export const fetchOneRecipe = (id: number) => axios.get<Recipe>(`${url}/${id}`)