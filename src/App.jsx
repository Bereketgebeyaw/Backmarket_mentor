import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerWishlist from "./pages/buyer/buyerWishlist";
import AdminLayout from './layouts/AdminLayout';
import SellerLayout from "./layouts/SellerLayout";
import UserLayout from './layouts/UserLayout';
import SellerOrders from './pages/seller/sellerOrders';
import ProductManagement from "./pages/admin/ProductManagement";
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import PasswordReset from './pages/Reset/passwordReset';
import PaymentPage from './components/PaymentPage';
import PickupPage from './components/PickupPage';
import FinalPaymentPage from './components/FinalPaymentPage';
import AddCategory from './pages/admin/AddCategory';
import UserCart from './pages/buyer/UserCart';
import UserDashboard from './pages/buyer/UserDashboard';
import AddSubcategory from './pages/admin/AddSubcategory';
import SellerSignupPage from "./pages/Signup/sellerSignupPage";
import Orders from './pages/buyer/Orders';
import OnboardSupplier from './pages/admin/OnboardSupplier';
import AddCatalog from './pages/admin/AddCatalog';
import Wishlist from './pages/buyer/Wishlist';
import ProductManagements from './pages/seller/ProductManagement';

const App = () => {
   
    return (
      <BrowserRouter>
        <Routes>
          <Route path="" element={<BuyerLayout />}>
            <Route path="" element={<BuyerDashboard />} />
          </Route>

          <Route path="/login/*" element={<LoginPage />}></Route>
          <Route path="/reset/*" element={<PasswordReset />}></Route>
          <Route path="wishlists" element={<BuyerWishlist />} />
          <Route path="/signup/*" element={<SignupPage />}></Route>
          <Route path="/register/*" element={<SellerSignupPage />}></Route>
          <Route path="/new" element={<UserCart />}></Route>
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route path="orders" element={<Orders />} />
            <Route path="veiw" element={<UserCart/>} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/PickupPage" element={<PickupPage />} />
          <Route path="/FinalPaymentPage" element={<FinalPaymentPage />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-subcategory" element={<AddSubcategory />} />
            <Route path="onboard-supplier" element={<OnboardSupplier />} />

            <Route path="add-catalog" element={<AddCatalog />} />
          </Route>
          <Route path="/seller/*" element={<SellerLayout />}>
            <Route path="product-management" element={<ProductManagements/>} />
            <Route path="orders" element={<SellerOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
