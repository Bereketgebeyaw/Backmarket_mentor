import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserTopbar from '../components/TopBar/UserTopbar';
import Footer from '../components/bottomBar/Footer';

const AdminLayout = () => {
  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{ marginLeft: '4rem' }}>
       
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd', position: 'sticky', top: 0 }}>
          <ul style={{ margin: '3rem 0', padding: 0 }}>
            <li style={{ marginTop: '3rem', listStyleType: 'none' }}>
              <Link to="/admin/product-management">Product Management</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' }}>
              <Link to="/admin/add-category">Add New Category</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' }}>
              <Link to="/admin/add-subcategory">Add New Subcategory</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' }}>
              <Link to="/admin/onboard-supplier">Onboard Supplier</Link>
            </li>
          </ul>
        </nav>

        {/* Main content area */}
        <div style={{ flex: 1, padding: '20px', marginTop: '3rem' }}>
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
