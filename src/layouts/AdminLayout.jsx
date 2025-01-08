import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserTopbar from '../components/TopBar/UserTopbar';
import Footer from '../components/bottomBar/Footer';

const AdminLayout = () => {
  return (
    <div style={{ backgroundColor:'#f7f7f7', }}>
      <div  style={{ marginLeft:"4rem"  , }}><UserTopbar /></div>
    <div style={{ display: 'flex' ,  }}>
      {/* Sidebar */}

      <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd', }}>
        <ul style={{position: 'fixed',  marginTop: '3rem' ,  }}>
          <li style={{  marginTop: '3rem'  , listStyleType:"none"  }} ><Link to="/admin/product-management">Product Management</Link></li>
          <li style={{  marginTop: '2rem' , listStyleType:"none" }}><Link to="/admin/add-category">Add New Category</Link></li>
             <li><Link to="/admin/add-subcategory">Add New Subcategory</Link></li> {/* New link */}


         

          


          {/* Add more admin routes here */}
        </ul>
      </nav>

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px' , marginTop: '3rem'}}>
        
        <Outlet /> {/* Renders the specific page based on the route */}
      </div>
    </div>
    <div  style={{ marginTop:"17rem", }}
    
    > <Footer/> </div>
    </div>
  );
};

export default AdminLayout;
