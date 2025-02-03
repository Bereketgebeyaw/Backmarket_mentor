import React from "react";

const AdditionalRequirements = ({
  formData,
  updateFormData,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div className="form-section" style={{marginTop:"-10rem"}}>
      <h3>Additional Requirements</h3>
      <label>
        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={(e) => updateFormData({ termsAccepted: e.target.checked })}
        />
        I agree to the Terms and Conditions.
      </label>
      <button type="button" onClick={prevStep} className="prev-button">
        Previous
      </button>
      <button type="button" onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default AdditionalRequirements;
