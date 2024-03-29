import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { connection } from "./sql_connection.js";

import recipesRoutes from './routes/recipes.js'
import recipeTypesRoutes from './routes/recipeTypes.js'
import productsRouter from './routes/products.js'
import authRouter from './routes/auth.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/', authRouter)
app.use('/recipes', recipesRoutes)
app.use('/recipeTypes', recipeTypesRoutes)
app.use('/products', productsRouter)

const PORT = process.env.PORT || 5000;

connection.connect(function (err) {
    if (err) console.log(err)
    else console.log('succesfully connected')
});


app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) })
