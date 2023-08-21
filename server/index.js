import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import recipesRouter from './routes/recipes.js'
import ingridientsRouter from './routes/ingridients.js'

const app = express();

app.use('/recipes', recipesRouter)
app.use('/ingridients', ingridientsRouter)

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

const CONNECTION_URL = "mongodb://127.0.0.1:27017/"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));


