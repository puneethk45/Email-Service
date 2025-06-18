const transporter = require('../config/nodemailer');
const emailTemplateModel = require('../models/emailTemplateModel');
const emailNotificationModel = require('../models/emailNotificationModel');
const { v4: uuidv4 } = require('uuid');
const sendEmail = async ({ userId, templateId, emailTo, emailCc }) => {
    const id = uuidv4(); ;
 
  try {
    
    const template = {
    subject: "Welcome to Our Platform!",
    text: "Hello, We're thrilled to have you on board.",
    html:
    `<html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f7fc;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              margin: 20px 0;
              text-align: center;
            }
            .cta-button {
              background-color: #007bff;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              margin-top: 20px;
            }
            .footer {
              font-size: 12px;
              color: #888;
              text-align: center;
              margin-top: 40px;
            }
            .footer a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Platform!</h1>
            </div>
            <div class="content">
              <p>Hi,</p>
              <p>We’re excited to have you on board. Our platform offers a range of exciting features that we know you'll love.</p>
              <p>Click the button below to get started:</p>
              <a href="https://your-platform-link.com/start" class="cta-button">Get Started</a>
            </div>
            <div class="footer">
              <p>If you have any questions, feel free to <a href="mailto:support@your-platform.com">contact us</a>.</p>
              <p>&copy; 2024 Your Platform, All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>`}

    if (!template) {
      throw new Error('Template not found');
    }

    const mailOptions = {
      from: 'info@categorytech.com',
      to: emailTo,
      cc: emailCc,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);
  
    await emailNotificationModel.saveEmailLog({
      id,
      userId,
      templateId,
      emailFrom: 'infor@categorytech.com',
      emailTo,
      emailCc,
      status: 1, // Success
      statusDesc: 'Email sent successfully',
    });

    return { message: 'Email sent successfully', info };
  } catch (error) {
    await emailNotificationModel.saveEmailLog({
      id,
      userId,
      templateId,
      emailFrom: 'info@categorytech.com',
      emailTo,
      emailCc,
      status: 0, 
      statusDesc: error.message,
    });
    throw error;
  }
};

module.exports = { sendEmail };
