import React from 'react'
import ReactDOM from 'react-dom/client'

// styles
import './index.css'

// fonts
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

// components
import ThemedApp from './ThemedApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemedApp />
    </React.StrictMode>,
)
