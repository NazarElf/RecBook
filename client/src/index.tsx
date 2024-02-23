import React, { StrictMode } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import RecipeDetails, { loader as detailsLoader } from './components/Recipes/RecipeDetails.tsx'
import ErrorPage from './components/Error/Error.tsx'
import Header from './components/Header/Header.tsx'
//import 
import Recipes, { loader as recipesLoader } from './components/Recipes/Recipes.tsx'
import './index.css'
import MyForm, { action as recipeFormAction, loader as recipeFormLoader } from './components/Form/Form.tsx'
import { action as destroyAction } from './components/Recipes/RecipeDestroy.ts'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Header />}
            errorElement={<ErrorPage />} >
            <Route errorElement={<ErrorPage />}>
                <Route index element={<div><h1>Index</h1></div>} />
                <Route
                    path='/recipes'
                    loader={recipesLoader}
                    element={<Recipes />} />
                <Route
                    path='/recipes/:id'
                    loader={detailsLoader}
                    element={<RecipeDetails />} />
                <Route
                    action={recipeFormAction}
                    path="/recipes/create"
                    element={<MyForm />} />
                <Route
                    path='/recipes/:id/modify'
                    loader={recipeFormLoader}
                    action={recipeFormAction}
                    element={<MyForm />} />
                <Route
                    path='/recipes/:id/delete'
                    action={destroyAction} />
            </Route>
        </Route>
    )
)

export const Main =
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>