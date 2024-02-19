import React, { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RecipeDetails from './components/Recipes/RecipeDetails.tsx'
import ErrorPage from './components/Error/Error.tsx'
import Header from './components/Navbar/Header.tsx'
import App from './App.tsx'
import './index.css'
import MyForm from './components/Form/Form.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        errorElement: <ErrorPage />,
        children:
            [
                {
                    errorElement: <ErrorPage/>,
                    children: [
                        {index: true, element: <div><h1>Index</h1></div>},
                        {
                            path: '/recipes',
                            element: <App />,
                        },
                        {
                            path: '/recipes/:id',
                            element: <RecipeDetails />,
                        },
                        {
                            path: '/recipes/create',
                            element: <MyForm/>
                        }
                    ]
                }
            ]
    }
])

export const Main =
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>