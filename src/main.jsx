import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // ✅ Import AuthContext

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>                 {/* ✅ Wrap with AuthProvider */}
      <CartProvider>              {/* ✅ Wrap CartProvider inside AuthProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
