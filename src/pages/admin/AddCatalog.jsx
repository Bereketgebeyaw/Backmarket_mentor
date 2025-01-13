import React, { useState, useEffect } from "react";
import { fetchCategories } from '../../services/categoryService';
import { fetchSubcategoriesByCategory } from '../../services/subcategoryService'; // Import the subcategory service

const AddCatalog = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    category_id: "",
    subcategory_id: "",
    brand: "",
    model: "",
    size: "",
  });
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  useEffect(() => {
    // Fetch categories when the component mounts
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category_id: categoryId });
    
    // Fetch subcategories when category is selected
    const fetchedSubcategories = await fetchSubcategoriesByCategory(categoryId);
    setSubcategories(fetchedSubcategories);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we are just logging the form data
    console.log(formData);
    // You can replace this with the actual POST request later
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Catalog</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="product_description">Product Description:</label>
          <textarea
            id="product_description"
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            rows="4"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          ></textarea>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="category_id">Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleCategoryChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="subcategory_id">Subcategory:</label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="size">Size (grams):</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Catalog
        </button>
      </form>
    </div>
  );
};

export default AddCatalog;
