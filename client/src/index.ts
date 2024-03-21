import { createRoot } from 'react-dom/client'
import { Main } from './index.tsx'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(Main)
