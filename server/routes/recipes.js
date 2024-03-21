import express from 'express';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe, fetchOneRecipe, checkValidity, checkUser } from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.use('/', checkUser)
router.post('/', createRecipe)
router.get('/:id', fetchOneRecipe)
router.use('/:id', checkValidity)
router.patch('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)

export default router;
