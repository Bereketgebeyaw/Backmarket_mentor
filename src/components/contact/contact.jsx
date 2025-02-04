import React from 'react'
import './contact.css';

const Contact = () => {
  return (
    <div >
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

    <div  className='contens2'>
        <form> 
            <label>Email</label>
            <input type='email' placeholder='email' className='email' />
            <label className='names' >Name</label>
            <input type='text' className='namess' placeholder='name'/>
            <label>Address</label>
            <input type='text' className='address' placeholder='address'/>
            <label>Message</label>
            <textarea placeholder='write your massage'/>
            <input type='submit' value='submit' className='button1'/>


        </form>
    </div>

    </div>


    </div>
  )
}

export default Contact