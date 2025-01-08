import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCategories } from '../services/categoryService';
import { fetchSubcategoriesByCategory } from '../services/subcategoryService'; // Import the subcategory service

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
   
    subcategory: '',
    quantity_in_stock: '',
    image: null,
    brand: '',
    price_range: '',
    size: '',
    target_demographics: '',
    shelf_life: '',
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      category: selectedCategory,
      subcategory: '', // Reset subcategory whenever the category changes
    }));
  
    if (!selectedCategory) {
      setSubcategories([]);
      return;
    }
  
    try {
      const subcategoriesData = await fetchSubcategoriesByCategory(selectedCategory);
      console.log("Subcategories data:", subcategoriesData);  // Log the data
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      alert('Could not load subcategories. Please try again later.');
    }
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('quantity_in_stock', formData.quantity_in_stock);
    data.append('description', formData.description);
    
    data.append('subcategory', formData.subcategory);
    data.append('image', formData.image);
    data.append('brand', formData.brand);
    data.append('price_range', formData.price_range);
    data.append('size', formData.size);
    data.append('target_demographics', formData.target_demographics);
    data.append('shelf_life', formData.shelf_life);

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
    <div style={styles.forms}>
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={{textAlign: 'center', color:"#00c04b" }}>Add New Product</h2>
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
      <input
        type="number"
        name="quantity_in_stock"
        placeholder="Quantity in Stock"
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

      <select
        name="category"
        value={formData.category}
        onChange={handleCategoryChange}
        required
        style={styles.input}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        name="subcategory"
        value={formData.subcategory}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Select Subcategory</option>
        {Array.isArray(subcategories) && subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))
        ) : (
          <option value="">No subcategories available</option>
        )}
      </select>

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
        required
        style={styles.input}
      />

      <select
        name="price_range"
        value={formData.price_range}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Select Price Range</option>
        <option value="Budget-Friendly">Budget-friendly</option>
        <option value="Mid-range">Mid-range</option>
        <option value="Premium">Premium</option>
      </select>

      <select
        name="size"
        value={formData.size}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Select Size/Packaging</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Bulk">Bulk</option>
      </select>

      <select
        name="target_demographics"
        value={formData.target_demographics}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Select Target Demographics</option>
        <option value="Adults">Adults</option>
        <option value="Children">Children</option>
        <option value="Seniors">Seniors</option>
      </select>

      <select
        name="shelf_life"
        value={formData.shelf_life}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Select Shelf Life</option>
        <option value="Perishables">Perishables</option>
        <option value="Non-Perishables">Non-Perishables</option>
      </select>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
        style={styles.fileInput}
      />
      <button type="submit" style={styles.button}>
        Add Product
      </button>
    </form>
    </div>
  );
};

const styles = {
  forms:{
  
   margin:"3rem 10rem 1rem 10rem",
   paddingTop:"2rem",
   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
   borderRadius: "10rem 0rem 0rem 0rem",
   backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)" ,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    
    borderRadius: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '0.1rem solid #00c04b',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',

    height: '100px',
    border: '0.1rem solid #00c04b',

  },
  fileInput: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {

    padding: '10px',
    backgroundColor: '#00c04b',
    color: '#fff',
    border: '0.1rem solid #00c04b',
    borderRadius: '5rem',

    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AddProductForm;

