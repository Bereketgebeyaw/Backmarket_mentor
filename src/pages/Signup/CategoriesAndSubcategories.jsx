import React from "react";

const CategoriesAndSubcategories = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="form-section">
      <h3>Categories and Subcategories</h3>
      <select
        value={formData.categories}
        onChange={(e) => updateFormData({ categories: e.target.value })}
        className="signup-input"
      >
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
        {/* Add more categories as needed */}
      </select>
      <select
        value={formData.subcategories}
        onChange={(e) => updateFormData({ subcategories: e.target.value })}
        className="signup-input"
      >
        <option value="">Select Subcategory</option>
        <option value="mobile">Mobile Phones</option>
        <option value="laptop">Laptops</option>
        {/* Add more subcategories as needed */}
      </select>
      <button type="button" onClick={prevStep} className="prev-button">
        Previous
      </button>
      <button type="button" onClick={nextStep} className="next-button">
        Continue
      </button>
    </div>
  );
};

export default CategoriesAndSubcategories;
