import express from 'express';
import { getRecipeTypes } from '../controllers/recipeTypes.js';

const router = express.Router()

router.get('/', getRecipeTypes)

export default router;