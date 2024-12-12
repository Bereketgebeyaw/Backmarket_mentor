import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardHome from './pages/DashboardHome';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
