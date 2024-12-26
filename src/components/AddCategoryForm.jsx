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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add New Category</h2>
      
      <input
        type="text"
        name="categoryName"
        placeholder="Category Name"
        value={formData.categoryName}
        onChange={handleChange}
        required
        style={styles.input}
      />
      
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
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AddCategoryForm;
