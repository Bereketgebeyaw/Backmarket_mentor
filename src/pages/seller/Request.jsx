import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/categoryService";
import { fetchSubcategoriesByCategory } from "../../services/subcategoryService";

const Request = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    category_id: "",
    subcategory_id: "",
    brand: "",
    model: "",
    size: "",
    message: ""
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category_id: categoryId });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("You are not authenticated. Please log in.");
          return;
        }
  
      const response = await fetch("http://localhost:5000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add request ");
      }

      const data = await response.json();
      setMessage(data.message);
      setFormData({
        product_name: "",
        product_description: "",
        category_id: "",
        subcategory_id: "",
        brand: "",
        model: "",
        size: "",
        message: ""
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding catalog item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Request a new product</h1>
      {message && <p style={{ color: message.includes("Error") ? "red" : "green", textAlign: "center" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Name:</label>
          <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Description:</label>
          <textarea name="product_description" value={formData.product_description} onChange={handleChange} rows="4" style={{ width: "100%", padding: "8px" }}></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category:</label>
          <select name="category_id" value={formData.category_id} onChange={handleCategoryChange} required style={{ width: "100%", padding: "8px" }}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Subcategory:</label>
          <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} required style={{ width: "100%", padding: "8px" }}>
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Brand:</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Model:</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Size (grams):</label>
          <input type="number" name="size" value={formData.size} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: "100%", padding: "8px" }}></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "10px", backgroundColor: "#38170c", color: "white", border: "none", cursor: "pointer" }}>
          {isSubmitting ? "Adding..." : "submit request"}
        </button>
      </form>
    </div>
  );
};

export default Request;
