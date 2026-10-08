import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Pages (we will create these next)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import CakeDetail from './pages/CakeDetail';
import Cart from './pages/Cart';

import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderTracking from './pages/OrderTracking';
import AboutUs from './pages/AboutUs';


// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCakes from './pages/admin/AdminCakes';
import AdminCustomers from './pages/admin/AdminCustomers';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            {/* Customer Routes */}
            <Route path="/"          element={<Home />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/shop"      element={<Shop />} />
            <Route path="/cake/:id"  element={<CakeDetail />} />
            <Route path="/cart"      element={<Cart />} />
            <Route path="/checkout"  element={<Checkout />} />
            <Route path="/profile"   element={<Profile />} />
            <Route path="/track/:id" element={<OrderTracking />} />
            <Route path="/about"  element={<AboutUs/>} />


            {/* Admin Routes */}
            <Route path="/admin"            element={<AdminDashboard />} />
            <Route path="/admin/orders"     element={<AdminOrders />} />
            <Route path="/admin/cakes"      element={<AdminCakes />} />
            <Route path="/admin/customers"  element={<AdminCustomers />} />
           
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;