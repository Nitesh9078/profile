require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// 1. CORS: Allow requests from your frontend (replace with your frontend's URL in production)
app.use(cors({ origin: '*' })); // For development. Be more specific in production!
// 2. Body Parser: To process JSON data from the request body
app.use(express.json());


// --- Nodemailer Transporter Setup ---
// This is how you connect to your email service provider.
// I'm using Gmail as an example. You MUST use an "App Password" for Gmail, not your regular password.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email from .env file
        pass: process.env.EMAIL_PASS  // Your App Password from .env file
    }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log("Error with email transporter config:", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});


// --- API Endpoint ---
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // 1. Simple Server-side Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // 2. Mail Options
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender's name and your sending email
        to: process.env.RECIPIENT_EMAIL,               // Where you want to receive the email
        replyTo: email,                                // So you can reply directly to the user's email
        subject: `New Portfolio Contact from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message}</p>
        `
    };

    // 3. Send the Email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // This error message will be shown to the user in the red alert box
            return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
