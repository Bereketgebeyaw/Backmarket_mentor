import React from 'react';
import AddCategoryForm from '../../components/AddCategoryForm'; // Path to AddCategoryForm component

const AddCategory = () => {
  return (
    <div>
      <h1>Add New Category</h1>
      <AddCategoryForm /> {/* This renders the form for adding a category */}
    </div>
  );
};

export default AddCategory;
