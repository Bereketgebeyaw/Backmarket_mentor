import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
        <ul>
          <li><Link to="/admin/product-management">Product Management</Link></li>
          <li><Link to="/admin/add-category">Add New Category</Link></li>

          <li><Link to="/admin/add-subcategory">Add New Subcategory</Link></li> {/* New link */}

          {/* Add more admin routes here */}
        </ul>
      </nav>

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        <Outlet /> {/* Renders the specific page based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
