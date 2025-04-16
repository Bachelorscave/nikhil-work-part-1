const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email function
exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Email verification template
exports.getVerificationEmailTemplate = (verificationUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      <p>Thank you for registering with Bachelors Cave. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
      </div>
      <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
      <p style="word-break: break-all; color: #2196F3;">${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account with Bachelors Cave, please ignore this email.</p>
      <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
      <p style="color: #666; font-size: 12px; text-align: center;">This is an automated email, please do not reply.</p>
    </div>
  `;
};

// Password reset template
exports.getPasswordResetEmailTemplate = (resetUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Password Reset</h2>
      <p>You requested a password reset for your Bachelors Cave account. Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #2196F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
      </div>
      <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
      <p style="word-break: break-all; color: #2196F3;">${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
      <p style="color: #666; font-size: 12px; text-align: center;">This is an automated email, please do not reply.</p>
    </div>
  `;
}; 