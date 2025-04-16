const nodemailer = require('nodemailer');
const { logger } = require('./logger');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  debug: true, // Enable debug logs
  logger: true  // Enable logger
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    logger.error('SMTP connection error:', error);
    console.error('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      from: process.env.EMAIL_FROM_ADDRESS
    });
  } else {
    logger.info('SMTP server is ready to send emails');
    console.log('SMTP server is ready to send emails');
  }
});

// Send email function
exports.sendEmail = async ({ email, subject, message }) => {
  try {
    console.log('Attempting to send email to:', email);
    console.log('Email subject:', subject);
    
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: email,
      subject,
      html: message
    };

    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully:', info.messageId);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Error sending email:', error);
    console.error('Error sending email:', error);
    throw error;
  }
};

// Email templates
exports.getVerificationEmailTemplate = (verificationUrl) => {
  return `
    <h1>Email Verification</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>This link will expire in 24 hours.</p>
  `;
};

exports.getPasswordResetEmailTemplate = (resetUrl) => {
  return `
    <h1>Password Reset</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>This link will expire in 1 hour.</p>
  `;
}; 