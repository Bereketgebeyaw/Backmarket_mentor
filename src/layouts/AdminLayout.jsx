import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserTopbar from '../components/TopBar/UserTopbar';
import Footer from '../components/bottomBar/Footer';

const AdminLayout = () => {
  return (
    
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <h1 style={{ textAlign:'center' }}>Welcome to admin dashboard</h1>
      <div style={{ marginLeft: '4rem' }}>
       
      </div>

      {/* Main content */}
      <div style={{ display: 'fixed', marginTop: '-5rem'}}>
        {/* Sidebar */}
        <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd', position: 'sticky', top: 0, }}>
          <ul style={{ margin: '3rem 0', padding: 0, }} >
            <li style={{ marginTop: '-3rem', listStyleType: 'none', backgroundColor:'#38170c' ,color: 'white' , padding:'1rem 2rem' ,}}>
              <Link style={{color: 'white' , textDecoration: 'none' , marginTop: '-100rem' }} to="/admin/product-management">Product Management</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' , backgroundColor:'#38170c' ,padding:'1rem 2rem'}}>
              <Link style={{color: 'white' , textDecoration: 'none' }}  to="/admin/add-category">Add New Category</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none', backgroundColor:'#38170c' , padding:'1rem 2rem' }}>
              <Link style={{color: 'white', textDecoration: 'none'}}  to="/admin/add-subcategory">Add New Subcategory</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' , backgroundColor:'#38170c' , padding:'1rem 2rem'}}>
              <Link style={{color: 'white' , textDecoration: 'none'}}  to="/admin/onboard-supplier">Onboard Supplier</Link>
            </li>
            <li style={{ marginTop: '2rem', listStyleType: 'none' , backgroundColor:'#38170c' ,padding:'1rem 2rem'}}>
      <Link style={{color: 'white', textDecoration: 'none'}}   to="/admin/add-catalog">Add New Catalog</Link>
    </li>
    <li style={{ marginTop: '2rem', listStyleType: 'none' , backgroundColor:'#38170c' , padding:'1rem 2rem'}}>
              <Link style={{color: 'white' , textDecoration: 'none'}}  to="/admin/requested-products">Requested Products</Link>
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
