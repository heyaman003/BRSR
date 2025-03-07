import "reflect-metadata";
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from '@/store/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
    <BrowserRouter>
    <App/>
   </BrowserRouter>
   </Provider>
  </StrictMode>,
)
