import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import { fetchCategories } from "../services/categoryService";
import { fetchSubcategoriesByCategory } from "../services/subcategoryService";
import { fetchCatalogsBySubCategory } from "../services/catalogService";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    catalog_id: "",
    price: "",
    quantity_in_stock: "",
    image: null,
    shelf_life: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category_id: categoryId,
      subcategory_id: "",
      catalog_id: "",
    }));

    if (categoryId) {
      try {
        const subcategories = await fetchSubcategoriesByCategory(categoryId);
        setSubcategories(subcategories);
        setCatalogs([]); // Reset catalogs
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  const handleSubCategoryChange = async (e) => {
    const subcategoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subcategory_id: subcategoryId,
      catalog_id: "",
    }));

    if (subcategoryId) {
      try {
        const catalogs = await fetchCatalogsBySubCategory(subcategoryId);
        setCatalogs(catalogs);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Redirect when "Request Admin to Add" is selected
    if (name === "catalog_id" && value === "request_new_product") {
      navigate("/request-catalog");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (formData.catalog_id) data.append("catalog_id", formData.catalog_id);
    if (formData.price) data.append("price", formData.price);
    if (formData.quantity_in_stock)
      data.append("quantity_in_stock", formData.quantity_in_stock);
    if (formData.image) data.append("image", formData.image);
    if (formData.shelf_life) data.append("shelf_life", formData.shelf_life);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      await axios.post("http://localhost:5000/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Add New Product</h2>
    <div style={{display:'flex' }}> 
    <label style={{marginLeft:"-4rem" , marginTop:'0.5rem' , marginBottom:'3rem'}}>catagory:</label>
    
        {/* Category Dropdown */}
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleCategoryChange}
          style={styles.input1}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown */}
        
        <select
          name="subcategory_id"
          value={formData.subcategory_id}
          onChange={handleSubCategoryChange}
          style={styles.input}
          disabled={!formData.category_id}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
        
        </div>
        <label style={{marginLeft:"14rem" , marginTop:'-4.5rem' , marginBottom:'3rem'}}>subcategories:</label>
       
        {/* Product Dropdown */}
       
        <select
          name="catalog_id"
          value={formData.catalog_id}
          onChange={handleChange}
          style={styles.input2}
          disabled={!formData.subcategory_id}
        >
          <option value="">Select Product</option>
          {catalogs.map((catalog) => (
            <option key={catalog.id} value={catalog.id}>
              {`${catalog.product_name} (Model: ${catalog.model}, Size: ${catalog.size}g)`}
            </option>
          ))}
          {/* Special option to request a new product */}
          <option value="request_new_product" style={styles.specialOption}>
            Product Not Found? Request Admin to Add
          </option>
        </select>
        <label style={{marginLeft:"-4rem" , marginTop:'-4.2rem' , marginBottom:'3rem'}}>product:</label>
        

        <div style={{display:'flex' , height:'5rem', marginTop:'-1rem' , marginLeft:'0rem'}}>
        <label style={{marginLeft:"-4rem" , marginTop:'0.8rem' , marginBottom:'3rem', marginRight:'2rem'}}>price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          onChange={handleChange}
          required
          style={styles.input1}
        />
        
        <input
          type="number"
          name="quantity_in_stock"
          value={formData.quantity_in_stock}
          placeholder="Quantity in Stock"
          onChange={handleChange}
          required
          style={styles.input3}
        /> </div>
           <label style={{marginLeft:"14rem" , marginTop:'-4.2rem' , marginBottom:'3rem'}}>quantity:</label>

        <div style={{display:'flex' , marginTop:'-1rem'}}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={styles.fileInput}
        />

        {/* Shelf Life Dropdown */}
        <select
          name="shelf_life"
          value={formData.shelf_life}
          onChange={handleChange}
          required
          style={styles.input1}
        >
          <option value="">Select Shelf Life</option>
          <option value="Perishables">Perishables</option>
          <option value="Non-Perishables">Non-Perishables</option>
        </select>
        <label style={{marginLeft:"-24rem" , marginTop:'1rem' , marginBottom:'3rem'}}>Shelf Life</label>
        </div>
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    marginTop: "-42rem",
    marginLeft:"22rem",
    padding: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    width:'50rem',
    height:'25rem',

  
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "0rem 20rem",
  },
  form: { maxWidth: "500px", margin: "auto" },
  header: { textAlign: "center", color: "#38170c" },
  input: {
    width: "30rem",
    padding: "10px",
    margin: "10px 0",
    
   
   
    height:'2.5rem',
    marginTop:'2rem',
    border: "0.1rem dashed #38170c",
    marginLeft:'1rem',
    backgroundColor: "white",
    borderRadius: "5px",
   
  },

  input1: {
    width: "25rem",
    padding: "10px",
    margin: "10px 0",
    border: "0.1rem dashed #38170c",
    backgroundColor: "white",
    borderRadius: "5px",
    marginLeft:'-5rem',
    marginTop: '2rem',

    
  },
  input3: {
    width: "30rem",
    padding: "10px",
    margin: "10px 0",
    border: "0.1rem dashed #38170c",
    backgroundColor: "white",
    borderRadius: "5px",
    marginLeft:'1rem',
    marginTop: '2rem',
    marginright:'2rem'
    
    
  },
  input2: {
    width: "36.2rem",
    padding: "10px",
    margin: "10px 0",
    border: "0.1rem dashed #38170c",
    backgroundColor: "white",
    borderRadius: "5px",
    marginLeft:'-5rem',
    marginTop: '1rem',

    
  },


  fileInput: { margin: "10px 0" , marginTop:'2.5rem' , marginLeft:'-5rem' , marginright:'4rem'},
  button: {
    padding: "10px 20px",
    backgroundColor: "#38170c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft:'24rem',
    marginTop:'1rem'
    
  },
  specialOption: {
    color: "red",
    fontWeight: "bold",
  },
};

export default AddProductForm;
