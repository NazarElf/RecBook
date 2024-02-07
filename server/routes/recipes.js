import express from 'express';
import { getRecipes, createRecipe } from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', createRecipe)

export default router;