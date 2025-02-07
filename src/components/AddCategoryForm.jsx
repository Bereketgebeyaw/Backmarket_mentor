import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send the POST request to create a new category
      const response = await axios.post('http://localhost:5000/category/create', {
        name: formData.categoryName,
        description: formData.description,
      });

      // Handle successful response
      alert(response.data.message); // Show success message
      setFormData({
        categoryName: '',
        description: '',
      }); // Clear the input fields after successful submission
    } catch (error) {
      // Handle error
      console.error('Error creating category:', error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Failed to create category. Please try again later.');
      }
    }
  };

  return (
    <div style={styles.category}>
    <form onSubmit={handleSubmit} style={styles.form}>
     
      <h2 style={styles.h2}>Add New Category</h2>
       <label style={{marginBottom:'-0.5rem'}}>category</label>
      <input
        type="text"
        name="categoryName"
        placeholder="Category Name"
        value={formData.categoryName}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <label style={{marginBottom:'-0.5rem'}}> Description</label>
      <textarea
        name="description"
        placeholder="Category Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={styles.textarea}
      ></textarea>


      <button type="submit" style={styles.button}>Add Category</button>
    
    </form>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: 'auto',
  
    padding: '20px',
    fontFamily: 'sans-serif',
    borderRadius: '8px',
   
  },
   h2:{
    textAlign: "center",
    color:" #38170c",
    marginBottom:'2rem',
    marginTop:'-2rem'
   },
  category:{
   backgroundColor: "rgba(255, 255, 255, 0.8)",
   backdropFilter: "blur(10px)" ,
   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
   margin :'0rem 19rem',
   height:'19rem',
   paddingTop: '5rem',
   paddingBottom: '5rem',
   marginTop : '-45rem',
   marginLeft:'25rem'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
   
    width:'25rem',
    border: "0.1rem dashed #38170c",
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    border: "0.1rem dashed #38170c",
  },
  button: {
    padding: '10px',
    backgroundColor: '#38170c',
    color: '#fff',
    border: 'none',
    borderRadius: '15rem',
    cursor: 'pointer',
    fontSize: '16px',
    
  },
 
};

export default AddCategoryForm;
