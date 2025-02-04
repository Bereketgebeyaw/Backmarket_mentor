import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/orders/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, address, message }),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      // Clear form or handle response as needed
    } else {
      alert('Error sending message');
    }
  };

  return (
    <div>
      <img src='/image/bunabankbuilding.jpg' alt='contact ' className='contenss' />
      <div className='contens'>
        <div className='contens1'>
          <h1>Contact Us</h1>
          <p className='ps'>
          At BackMarket, we value your feedback and are here to assist you
     with any inquiries or concerns. Whether you need help with your
      order, have questions about our products, or want to learn more
       about our services, our dedicated customer support team is ready
        to help. Please reach out to us through our website's contact form,
         and we look forward to hearing from you to ensure you have the best
          experience possible!
          </p>
        </div>

        <div className='contens2'>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              placeholder='email'
              className='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='names'>Name</label>
            <input
              type='text'
              className='namess'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Address</label>
            <input
              type='text'
              className='address'
              placeholder='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Message</label>
            <textarea
              placeholder='write your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type='submit' value='submit' className='button1' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;