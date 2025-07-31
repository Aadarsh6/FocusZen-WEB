import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ThemeProvider } from './Context/themeContext.jsx';
// import { ThemeProvider, useTheme } from "./Context/index.js"

createRoot(document.getElementById('root')).render(

<StrictMode>  
  <App />
</StrictMode>


);
