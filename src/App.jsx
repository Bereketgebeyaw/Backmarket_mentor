import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerWishlist from "./pages/buyer/buyerWishlist";
import AdminLayout from './layouts/AdminLayout';
import SellerLayout from "./layouts/SellerLayout";
import ProductManagement from './pages/admin/ProductManagement';

import LoginPage from './pages/Login/LoginPage';

import SignupPage from './pages/Signup/SignupPage';

import PaymentPage from './components/PaymentPage';
import PickupPage from './components/PickupPage';
import FinalPaymentPage from './components/FinalPaymentPage';
import AddCategory from './pages/admin/AddCategory';

import UserCart from './pages/buyer/UserCart';
import UserDashboard from './pages/buyer/UserDashboard';
import SellerSignupPage from "./pages/Signup/sellerSignupPage";
import Orders from './pages/buyer/Orders';


const App = () => {
   
    return (
      <BrowserRouter>
        <Routes>
          <Route path="" element={<BuyerLayout />}>
            <Route path="" element={<BuyerDashboard />} />
            <Route path="/wishlists" element={<BuyerWishlist />} />
          </Route>

          <Route path="/login/*" element={<LoginPage />}></Route>

          <Route path="/signup/*" element={<SignupPage />}></Route>
          <Route path="/register/*" element={<SellerSignupPage />}></Route>
          <Route path="/user/*" element={<UserCart />}></Route>
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route path="orders" element={<Orders />} />{" "}
            {/* Nested Orders route */}
          </Route>
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/PickupPage" element={<PickupPage />} />
          <Route path="/FinalPaymentPage" element={<FinalPaymentPage />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="add-category" element={<AddCategory />} />
          </Route>
          <Route path="/seller/*" element={<SellerLayout />}>
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="add-category" element={<AddCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
