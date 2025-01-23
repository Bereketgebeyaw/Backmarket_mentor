import React from "react";
import { Link, Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <nav
       style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd', position: 'sticky', top: 0, }}
      >
        <ul style={{ margin: '3rem 0', padding: 0, }} >
        <li style={{ marginTop: '-3rem', listStyleType: 'none', backgroundColor:'#38170c' ,color: 'white' , padding:'1rem 2rem' ,}}>
                      <Link style={{color: 'white' , textDecoration: 'none'  }} to="/seller/product-management">Product Management</Link>
                    </li>
           
           

        </ul>
      </nav>

    
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Seller Dashboard</h1>
        <Outlet /> {/* Renders the specific page based on the route */}
      </div>
    </div>
  );
};

export default SellerLayout;
