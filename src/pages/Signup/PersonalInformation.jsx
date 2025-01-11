import React from "react";

const PersonalInformation = ({ formData, updateFormData, nextStep }) => {
  return (
    <div className="form-section">
      <h3>Personal Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
        className="signup-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        className="signup-input"
      />
     
     
      <label>
        Upload Kebele ID:
        <input
          type="file"
          onChange={(e) => updateFormData({ kebeleId: e.target.files[0] })}
          className="signup-input"
        />
      </label>
      <button type="button" onClick={nextStep} className="next-button">
        Continue
      </button>
    </div>
  );
};

export default PersonalInformation;
