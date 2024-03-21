import { fetchAllProducts, fetchRecipeTypes } from "../../api/index.ts"

export async function loader() {
    const { data: products } = await fetchAllProducts()
    const { data: recipeTypes } = await fetchRecipeTypes()
    return { products, recipeTypes }
}