import React from 'react'
import Footer from '../bottomBar/Footer'
import './about.css';
import TopBar from '../TopBar/TopBar';
import { useState } from 'react';

const About = () => {
    const [cartCount, setCartCount] = useState([]);
   
    return (
    <div   >
       <div className="topbars" > <TopBar cartCount={cartCount} setCartCount={setCartCount} /></div>
      <img  src="/image/sale7.png" alt='about ' className='images '/>
      <h3 className='text'>About Us</h3>

      <div className="containerr">
    <div className="image">
        <img src="/image/about.png" alt="E-commerce"/>
    </div>
    <div className="texts">
       
        <p>
            At backmarket, we are a leading e-commerce platform dedicated to providing 
            an exceptional online shopping experience since 2022. Our mission is to 
            make shopping easy and enjoyable, offering a wide selection of high-quality 
            products across various categories, including electronics, fashion, and home 
            goods. With a customer-centric approach, our dedicated service team ensures a
             smooth experience, while our commitment to sustainability promotes eco-friendly 
             practices and supports local businesses. Join us today and discover the future of online shopping!
        </p>
    </div>
</div>
    


<div className="containers">
        <div className="cardr">
            <div className="icon">&#128640;</div> 
            <h2>Our Values</h2>
            <p>We prioritize integrity, customer satisfaction, and sustainability in everything we do.</p>
        </div>
        <div className="cardr">
            <div className="icon">&#127760;</div> 
            <h2>Our Vision</h2>
            <p>To be the most trusted and innovative e-commerce platform, enhancing the shopping experience.</p>
        </div>
        <div className="cardr">
            <div className="icon">&#128640;</div>
            <h2>Our Mission</h2>
            <p>To provide high-quality products and exceptional service, making online shopping easy and enjoyable.</p>
        </div>
    </div>
     <div>
        <Footer/>
     </div>
    </div>
  )
}

export default About


