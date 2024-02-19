import { create } from 'zustand'
import * as api from '../api/index.ts'
import type { Recipe } from '../interfaces/dataTypes.ts'


interface RecipesStore {
    recipes: Array<Recipe>,
    fetchAllRecipes(): any,
    createRecipe(recipe: Recipe): any,
    removeRecipe(id: number): any,
    updateRecipe(id: number, recipe: Recipe): any,
}

const useRecipesStore = create<RecipesStore>((set, get) => ({
    recipes: [],
    fetchAllRecipes: async () => {
        const { data } = await api.fetchRecipes();
        console.log(data)
        set({ recipes: data })
    },
    createRecipe: async (recipe : Recipe) => {
        const { data } = await api.createRecipe(recipe);
        console.log(data)
        set(state => ({ recipes: [...state.recipes, data] }))
    },
    removeRecipe: async (id : number) => {
        await api.removeRecipe(id)
        console.log('remove recipe with id = ', id)
        set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) }))
    },
    updateRecipe: async (id : number, recipe : Recipe) => {
        const { data } = await api.updateRecipe(id, recipe);
        set(state => ({ recipes: state.recipes.map(item => item.id === id ? data : item) }))
    },
}))

export default useRecipesStore;