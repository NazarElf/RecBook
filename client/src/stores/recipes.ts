import { create } from 'zustand'
import * as api from '../api/index.ts'
import type { Recipe } from '../interfaces/dataTypes.ts'


interface RecipesStore {
    isProcessing: boolean,
    recipe?: Recipe,
    recipes: Array<Recipe>,
    fetchAllRecipes(): any,
    createRecipe(recipe: Recipe): any,
    removeRecipe(id: number): any,
    updateRecipe(id: number, recipe: Recipe): any,
    fetchOneRecipe(id:number) : any
}

const useRecipesStore = create<RecipesStore>((set, get) => ({
    isProcessing: false,
    recipes: [],
    recipe: undefined,
    fetchAllRecipes: async () => {
        const { data } = await api.fetchRecipes();
        console.log(data)
        set({ recipes: data })
    },
    createRecipe: async (recipe: Recipe) => {
        set({ isProcessing: true })
        const { data } = await api.createRecipe(recipe);
        console.log("HERE IS DATA",data)
        set(state => ({ recipes: [...state.recipes, data], isProcessing: false }))
    },
    removeRecipe: async (id: number) => {
        await api.removeRecipe(id)
        console.log('remove recipe with id = ', id)
        set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) }))
    },
    updateRecipe: async (id: number, recipe: Recipe) => {
        const { data } = await api.updateRecipe(id, recipe);
        set(state => ({ recipes: state.recipes.map(item => item.id === id ? data : item) }))
    },
    fetchOneRecipe: async (id: number) => 
    {
        const {data} = await api.fetchOneRecipe(id)
        set(() => ({recipe: data}))
    }
}))

export default useRecipesStore;