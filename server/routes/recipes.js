import express from 'express'
import { getRecipes, createRecipe } from '../controllers/recipes.js'
import { createIngridient } from '../controllers/ingridients.js'

const recipesRouter = express.Router();

recipesRouter.get('/', getRecipes);
recipesRouter.post('/create_recipe', createRecipe);
recipesRouter.post('/create_product', createIngridient)

export default recipesRouter;