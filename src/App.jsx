import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/buyer/*" element={<BuyerLayout />}>
                    <Route path="" element={<BuyerDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
