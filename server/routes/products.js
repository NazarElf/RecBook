import express from "express";
import { fetchAllProducts, fetchProductsByRecipe } from "../controllers/products.js";

const router = express.Router()

router.get('/', fetchAllProducts)
router.get('/:id', fetchProductsByRecipe)

export default router