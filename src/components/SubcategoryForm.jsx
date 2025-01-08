import React, { useState, useEffect } from "react";
import { fetchCategories } from '../services/categoryService'; // Adjust path based on structure
import axios from "axios";

const SubcategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState({
    name: "",
    description: "",
    category_id: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubcategory({ ...subcategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/subcategory", subcategory);
      setMessage(`Subcategory "${response.data.name}" added successfully!`);
      setSubcategory({ name: "", description: "", category_id: "" });
    } catch (error) {
      console.error("Error adding subcategory:", error);
      setMessage("Failed to add subcategory. Please try again.");
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const messageStyle = {
    textAlign: "center",
    marginBottom: "16px",
    color: message.includes("successfully") ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Subcategory</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" style={labelStyle}>Subcategory Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={subcategory.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="description" style={labelStyle}>Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={subcategory.description}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="category_id" style={labelStyle}>Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={subcategory.category_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>Add Subcategory</button>
      </form>
    </div>
  );
};

export default SubcategoryForm;
