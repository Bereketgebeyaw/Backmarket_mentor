import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/categoryService";
import { fetchSubcategoriesByCategory } from "../../services/subcategoryService"; // Import the subcategory service

const AddCatalog = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    category_id: "",
    subcategory_id: "",
    brand: "",
    model: "",
    size: "",
    unit: "",
    index_terms: [], // New field for index terms
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [termInput, setTermInput] = useState(""); // Temporary input for new term

  const unitOptions = ["kg", "g", "liter", "ml", "m", "cm", "inch", "ft"];

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

  // Handle adding index terms
  const handleAddTerm = () => {
    if (termInput.trim() !== "" && !formData.index_terms.includes(termInput)) {
      setFormData((prevData) => ({
        ...prevData,
        index_terms: [...prevData.index_terms, termInput.trim()],
      }));
      setTermInput(""); // Clear input field
    }
  };

  // Handle removing an index term
  const handleRemoveTerm = (term) => {
    setFormData((prevData) => ({
      ...prevData,
      index_terms: prevData.index_terms.filter((t) => t !== term),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/catalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add catalog item");
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
        unit: "",
        index_terms: [], // Reset index terms
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding catalog item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        margin: "0rem 15rem",
        marginLeft: "22rem",
        marginTop: "-43rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width:'50rem',
      
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Catalog
      </h1>

      {message && (
        <p
          style={{
            color: message.includes("Error") ? "red" : "green",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ margin: "5rem" , height:'25rem' }}>
        <div  style={{display:"flex" , marginTop:"-3rem"}}>
        {/* Product Name */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            style={{
              width: "16rem",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
            }}
          />
        </div>

     

        {/* Category & Subcategory */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="category_id">Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleCategoryChange}
            required
            style={{
              width: "23rem",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
              marginLeft: '1rem',
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        </div>

           {/* Product Description */}
           <div style={{ marginBottom: "15px" , marginTop:"-1rem" }}>
          <label htmlFor="product_description">Product Description:</label>
          <textarea
            id="product_description"
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
              height:"4rem"
            }}
          ></textarea>
        </div>



   <div style={{display:'flex' , marginTop:'-1rem'}}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="subcategory_id">Subcategory:</label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            required
            style={{
              width: "13rem",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
            }}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand & Model */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            
            style={{
              width: "12rem",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
              marginLeft:"1rem",
              marginRight: "1rem",
            }}
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
            
            style={{
              width: "12rem",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
            }}
          />
        </div> </div>

        {/* Size */}
        <div style={{ marginBottom: "15px" , marginTop:'-1rem' }}>
      <label htmlFor="size">Size:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "0.1rem dashed #38170c",
            marginRight: "10px",
            marginTop:'-1rem'
          }}
        />

        {/* Unit Selection */}
        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "0.1rem dashed #38170c",
            
          }}
        >
          <option value="">Select Unit</option>
          {unitOptions.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>


        {/* Index Terms */}
        <div style={{ marginBottom: "15px" , marginTop:'-1rem'}}>
          <label>Index Terms:</label>
          <input
            type="text"
            value={termInput}
            onChange={(e) => setTermInput(e.target.value)}
            placeholder="Enter term and press Add"
            style={{
              width: "82%",
              padding: "8px",
              borderRadius: "4px",
              border: "0.1rem dashed #38170c",
            }}
          />
          <button type="button" style={{backgroundColor:'yellow' , height:'2rem' , width:'6rem' ,}} onClick={handleAddTerm}>
            Add
          </button>
          <ul style={{display:'flex' , gap:'1rem'}} >
            {formData.index_terms.map((term, index) => (
              <li key={index} style={{marginRight:'0.5rem'}}>
                {term}{" "}
                <button type="button" style={{backgroundColor:"red"}} onClick={() => handleRemoveTerm(term)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" disabled={isSubmitting} style={{  marginLeft:'25rem', padding:"0.7rem 5rem"  ,backgroundColor:"#38170c" , color:"white"}}>
          {isSubmitting ? "Adding..." : "Add Catalog"}
        </button>
      </form>
    </div>
  );
};

export default AddCatalog;
