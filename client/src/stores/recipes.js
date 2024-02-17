import { create } from 'zustand'
import * as api from '../api'

const useRecipesStore = create((set, get) => ({
    recipes: [],
    fetchAllRecipes: async () => {
        const { data } = await api.fetchRecipes();
        console.log(data)
        set({ recipes: data })
    },
    createRecipe: async (recipe) => {
        const { data } = await api.createRecipe(recipe);
        console.log(data)
        set(state => ({ recipes: [...state.recipes, data] }))
    },
    removeRecipe: async (id) => {
        await api.removeRecipe(id)
        console.log('remove recipe with id = ', id)
        set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) }))
    },
    updateRecipe: async (id, recipe) => {
        const { data } = await api.updateRecipe(id, recipe);
        set(state => ({ recipes: state.recipes.map(item => item.id === id ? data : item) }))
    },
}))

export default useRecipesStore;