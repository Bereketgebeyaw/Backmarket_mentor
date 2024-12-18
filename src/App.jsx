import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import ProductManagement from './pages/admin/ProductManagement';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';


const App = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/buyer/*" element={<BuyerLayout />}>
                    <Route path="" element={<BuyerDashboard />} />
                </Route>
                <Route path="/login/*" element={<LoginPage />}></Route>
                <Route path="/signup/*" element={<SignupPage/>}></Route>
                <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="product-management" element={<ProductManagement />} />
        </Route>
       


            </Routes>
        </BrowserRouter>
    );
};

export default App;
