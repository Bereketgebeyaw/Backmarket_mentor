import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null, // To hold the selected file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      // Handle file input
      setFormData({ ...formData, image: files[0] });
    } else {
      // Handle other inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add New Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        style={styles.textarea}
      ></textarea>
      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
        style={styles.fileInput}
      />
      <button type="submit" style={styles.button}>Add Product</button>
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
  fileInput: {
    padding: '10px',
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

export default AddProductForm;
