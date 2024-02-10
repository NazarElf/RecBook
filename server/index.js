import express from "express";
import bodyParser from "body-parser";
import * as mysql from 'mysql2';
import cors from 'cors';
import { connection } from "./sql_connection.js";

import recipesRoutes from './routes/recipes.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/recipes',recipesRoutes)

const PORT = process.env.PORT || 5000;

connection.connect(function(err){
    if(err) console.log(err)
    else console.log('succesfully connected')
});


app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})


//connection.end();