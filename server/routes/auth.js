import express from "express";
import { login, passToken, register } from "../controllers/auth.js";

const router = express.Router();

router.use('/', passToken)
router.post('/register', register)
router.post('/login', login)

export default router