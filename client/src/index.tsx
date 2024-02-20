import React, { StrictMode } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import RecipeDetails, {loader as detailsLoader} from './components/Recipes/RecipeDetails.tsx'
import ErrorPage from './components/Error/Error.tsx'
import Header from './components/Navbar/Header.tsx'
import App from './App.tsx'
import './index.css'
import MyForm from './components/Form/Form.tsx'

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
                    element={<App />} />
                <Route
                    path='/recipes/:id'
                    loader={detailsLoader}
                    element={<RecipeDetails />} />
                <Route
                    path="/recipes/create"
                    element={<MyForm />} />
            </Route>
        </Route>
    )
)

export const Main =
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>