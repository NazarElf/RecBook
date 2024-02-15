import React, { StrictMode } from 'react'
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'

import reducers from './reducers'


import App from './App'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={reducers}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>
)
