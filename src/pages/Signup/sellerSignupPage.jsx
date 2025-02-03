import React, { useState } from "react";
import "./sellerSignup.css";
import PersonalInformation from "./PersonalInformation";
import BusinessInformation from "./BusinessInformation";
import CategoriesAndSubcategories from "./CategoriesAndSubcategories";
import AdditionalRequirements from "./AdditionalRequirements";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/bottomBar/Footer";

const SellerSignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // Tracks the current step
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kebeleId: null,
    businessName: "",
    businessLicense: null,
    tinCertificate: null,
    vatCertificate: null,
    physicalAddress: "",
    storeDescription: "",
    bankAccount: "",
    categories: "",
    subcategories: "",
    termsAccepted: false,
    isSeller: true,
  });

  // Handle form data updates
  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // Move to the next step
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  // Move to the previous step
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);
 
  const generateRandomPassword = (length = 12) => {
   const charset =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
   let password = "";
   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * charset.length);
     password += charset[randomIndex];
   }
   return password;
 };
  // Handle final submission
 const handleSubmit = async () => {
   // Check if all required fields are filled
   const requiredFields = [
     "name",
     "email",
     "kebeleId",
     "businessName",
     "businessLicense",
     "tinCertificate",
     "vatCertificate",
     "physicalAddress",
     "storeDescription",
     "bankAccount",
     "categories",
     "subcategories",
     "termsAccepted",
   ];

   for (let field of requiredFields) {
     if (
       !formData[field] ||
       (formData[field] instanceof File && !formData[field].name)
     ) {
       alert(`Please fill in the ${field} field.`);
       return; // Stop execution if any field is empty
     }
   }

   // Generate a random password
   const randomPassword = generateRandomPassword();

   // Append the password to the formData
   const formDataToSend = new FormData();
   Object.keys(formData).forEach((key) => {
     formDataToSend.append(key, formData[key]);
   });
   formDataToSend.append("password", randomPassword); // Add the generated password

   try {
     
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        body: formDataToSend, // Do not set the "Content-Type" header manually
      });


     if (response.status === 201) {
       alert(
         "Your request accepted successfully! Please wait for the evaluation process. You will be notified via email about the status of your request to become a seller."
       );
       window.location.href = "/"; // Redirect to home page or login page
     } else {
       alert("Something went wrong. Please try again.");
     }
   } catch (error) {
     alert("Error connecting to the server. Please try again.");
   }
 };


  return (
    <div className="top">
      
    <div className="signup-container">
      <div className="forms">
      <h2 className="signup-title">Seller Sign Up</h2>
      {currentStep === 1 && (
        <PersonalInformation
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <BusinessInformation
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
         
        />
      )}
      {currentStep === 3 && (
        <CategoriesAndSubcategories
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 4 && (
        <AdditionalRequirements
          formData={formData}
          updateFormData={updateFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
      </div>
    </div>
    
    </div>
  );
};

export default SellerSignupPage;
