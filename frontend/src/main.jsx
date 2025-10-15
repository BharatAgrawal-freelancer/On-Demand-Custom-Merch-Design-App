import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import AOS from "aos"
import App from "./App.jsx"
import "./index.css"
import { AuthProvider } from "./context/AuthContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"

AOS.init({ duration: 700, once: true, offset: 40 })

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
