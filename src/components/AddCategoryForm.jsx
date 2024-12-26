import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Category: "${formData.categoryName}"\nDescription: "${formData.description}" added successfully!`);
    setFormData({
      categoryName: '',
      description: '',
    }); // Clear the input fields after submission
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
