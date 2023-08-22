import React from 'react'
import App from './App'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client'

import reducers from './reducers'

const store = configureStore({ reducer: reducers })

const domNode= document.getElementById('root')
const root = createRoot(domNode)
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
