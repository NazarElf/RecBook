import express from 'express'
import { getRecipes, createRecipe } from '../controllers/recipes.js'
import { createProduct } from '../controllers/products.js'

const router = express.Router();

router.get('/', getRecipes);
router.post('/create_recipe', createRecipe);
router.post('/create_product', createProduct)

export default router;