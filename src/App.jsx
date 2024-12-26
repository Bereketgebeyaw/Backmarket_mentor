import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import ProductManagement from './pages/admin/ProductManagement';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import UserLayout from './layouts/UserLayout';
import PaymentPage from './components/PaymentPage';
import PickupPage from './components/PickupPage';
import FinalPaymentPage from './components/FinalPaymentPage';
import AddCategory from './pages/admin/AddCategory';

import UserCart from './pages/buyer/UserCart';


const App = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                 
                <Route path="/buyer/*" element={<BuyerLayout />}>
                    <Route path="" element={<BuyerDashboard />} />
                </Route>
                <Route path="/login/*" element={<LoginPage />}></Route>
                <Route path="/signup/*" element={<SignupPage/>}></Route>
                <Route path="/user/*" element={<UserCart />}>
                </Route>
                <Route path="/PaymentPage" element={<PaymentPage />} />
                <Route path="/PickupPage" element={<PickupPage />} />
                <Route path="/FinalPaymentPage" element={<FinalPaymentPage />} />
                <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="product-management" element={<ProductManagement />} />
                <Route path="add-category" element={<AddCategory />} />
        </Route>
       


            </Routes>
        </BrowserRouter>
    );
};

export default App;
