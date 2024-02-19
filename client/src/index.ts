import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './index.tsx'

import App from './App.tsx'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(Main)
