import React from "react";

const BusinessInformation = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="form-section">
      <h3>Business Information</h3>
      <input
        type="text"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={(e) => updateFormData({ businessName: e.target.value })}
        className="signup-input"
      />
      <textarea
        placeholder="Store Description"
        value={formData.storeDescription}
        onChange={(e) => updateFormData({ storeDescription: e.target.value })}
        className="signup-input"
      />
      <input
        type="text"
        placeholder="Physical Address"
        value={formData.physicalAddress}
        onChange={(e) => updateFormData({ physicalAddress: e.target.value })}
        className="signup-input"
      />
      <label>
        Upload Business License:
        <input
          type="file"
          onChange={(e) =>
            updateFormData({ businessLicense: e.target.files[0] })
          }
          className="signup-input"
        />
      </label>
      <label>
        Upload TIN Certificate:
        <input
          type="file"
          onChange={(e) =>
            updateFormData({ tinCertificate: e.target.files[0] })
          }
          className="signup-input"
        />
      </label>
      <label>
        Upload VAT Certificate:
        <input
          type="file"
          onChange={(e) =>
            updateFormData({ vatCertificate: e.target.files[0] })
          }
          className="signup-input"
        />
      </label>
      <input
        type="text"
        placeholder="CBE Bank Account Number"
        value={formData.bankAccount}
        onChange={(e) => updateFormData({ bankAccount: e.target.value })}
        className="signup-input"
      />
      <button type="button" onClick={prevStep} className="prev-button">
        Previous
      </button>
      <button type="button" onClick={nextStep} className="next-button">
        Continue
      </button>
    </div>
  );
};

export default BusinessInformation;
