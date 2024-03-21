import express from 'express'
import {getIngridient, createIngridient} from '../controllers/ingridients.js'

const ingridientsRouter = express.Router();

ingridientsRouter.get('/', getIngridient);
ingridientsRouter.post('/', createIngridient);


export default ingridientsRouter;