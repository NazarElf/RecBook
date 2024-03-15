import axios from 'axios'
import { RecipeProduct, type Recipe, type RecipeDetails, type RecipeType, type SendRecipe, Product } from '../interfaces/dataTypes'

const url = 'http://192.168.0.111:5000'
const recipesUrl = `${url}/recipes`
const recipeTypesUrl = `${url}/recipeTypes`
const productsUrl = `${url}/products`

export const fetchRecipes = (paramsString: string) => {
    return axios.get<Recipe[]>(recipesUrl + '?' + paramsString)
}
export const createRecipe = (newRecipe: SendRecipe) => axios.post<SendRecipe>(recipesUrl, newRecipe)
export const updateRecipe = (id: number, updRecipe: SendRecipe) => axios.patch<SendRecipe>(`${recipesUrl}/${id}`, updRecipe)
export const removeRecipe = (id: number) => axios.delete(`${recipesUrl}/${id}`)
export const fetchOneRecipe = (id: number) => axios.get<RecipeDetails>(`${recipesUrl}/${id}`)

export const fetchRecipeTypes = () => axios.get<RecipeType[]>(recipeTypesUrl)

export const fetchProductsByRecipe = (id: number) => axios.get<RecipeProduct[]>(`${productsUrl}/${id}`)

export const fetchAllProducts = () => axios.get<Product>(productsUrl)