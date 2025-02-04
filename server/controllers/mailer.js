import nodemailer from "nodemailer";
import db from "../db.js";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "azebmehrete13@gmail.com",
    pass: "azfp awgj rilz huxw ",
  },
});

export const sendApprovalEmail = (email, password) => {
  const mailOptions = {
    from: "azebmehrete13@gmail.com",
    to: email,
    subject: "Approval Notification",
    html: `<p>Congratulations! You have passed the evaluation process.</p>
           <p>You can access our portal using the following credentials:</p>
           <p>Username: ${email}</p>
           <p>Password: ${password}</p>
           <p><a href="http://localhost:5173/login">Login to your account</a></p>
           <p>Please reset your password upon your first login.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};


export const sendDenialEmail = (email, reason) => {
  const mailOptions = {
    from: "azebmehrete13@gmail.com",
    to: email,
    subject: "Application Denied",
    html: `<p>We regret to inform you that your application has been denied.</p>
           <p>Reason: ${reason}</p>
           <p>For further inquiries, please contact us at <a href="mailto:support@your-portal-url.com">support@your-portal-url.com</a>.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};



export const sendRequestApprovalEmail = async (email, id) => {
  try {
    const query = `
      SELECT 
        requests.*, 
        categories.name AS category_name, 
        subcategories.name AS subcategory_name
      FROM 
        requests
      JOIN 
        categories ON requests.category_id = categories.id
      JOIN 
        subcategories ON requests.subcategory_id = subcategories.id
      WHERE 
        requests.id = $1;
    `;

    console.log("Fetching request details...");
    const { rows } = await db.query(query, [id]); // PostgreSQL returns rows inside an object

    if (!rows || rows.length === 0) {
      console.error("Request not found.");
      return;
    }

    const request = rows[0]; // Get the first result

    const mailOptions = {
      from: "azebmehrete13@gmail.com",
      to: email,
      subject: "Approval Notification for Your Product Request",
      html: `
        <p>Dear ${email},</p>
        <p>Your product request has been <strong>approved</strong>. Here are the details:</p>
        <ul>
          <li><strong>Product Name:</strong> ${request.product_name}</li>
          <li><strong>Category:</strong> ${request.category_name}</li>
          <li><strong>Subcategory:</strong> ${request.subcategory_name}</li>
          <li><strong>Brand:</strong> ${request.brand || "N/A"}</li>
          <li><strong>Model:</strong> ${request.model || "N/A"}</li>
          <li><strong>Size:</strong> ${request.size || "N/A"}</li>
          <li><strong>Requested On:</strong> ${new Date(request.created_at).toLocaleDateString()}</li>
        </ul>
        <p>You can now proceed with the next steps.</p>
        <p><strong>Best regards.</strong></p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error fetching request details or sending email:", error);
  }
};


export const sendRequestDenialEmail = async (email, id) => {
  try {
    const query = `
      SELECT 
        requests.*, 
        categories.name AS category_name, 
        subcategories.name AS subcategory_name
      FROM 
        requests
      JOIN 
        categories ON requests.category_id = categories.id
      JOIN 
        subcategories ON requests.subcategory_id = subcategories.id
      WHERE 
        requests.id = $1;
    `;

    console.log("Fetching request details...");
    const { rows } = await db.query(query, [id]); // PostgreSQL returns rows inside an object

    if (!rows || rows.length === 0) {
      console.error("Request not found.");
      return;
    }

    const request = rows[0]; // Get the first result

    const mailOptions = {
      from: "azebmehrete13@gmail.com",
      to: email,
      subject: "Rejection Notification for Your Product Request",
html: `
  <p>Dear ${email},</p>
  <p>We regret to inform you that your product request has been <strong>rejected</strong>. Here are the details:</p>
  <ul>
    <li><strong>Product Name:</strong> ${request.product_name}</li>
    <li><strong>Category:</strong> ${request.category_name}</li>
    <li><strong>Subcategory:</strong> ${request.subcategory_name}</li>
    <li><strong>Brand:</strong> ${request.brand || "N/A"}</li>
    <li><strong>Model:</strong> ${request.model || "N/A"}</li>
    <li><strong>Size:</strong> ${request.size || "N/A"}</li>
    <li><strong>Requested On:</strong> ${new Date(request.created_at).toLocaleDateString()}</li>
  </ul>
  <p>Unfortunately, your request did not meet our current requirements. If you believe this was a mistake or would like more details, please feel free to reach out to our support team.</p>
  <p>We appreciate your understanding.</p>
  <p><strong>Best regards,</strong></p>
`

      ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error fetching request details or sending email:", error);
  }
};