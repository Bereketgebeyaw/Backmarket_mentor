import nodemailer from "nodemailer";

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
