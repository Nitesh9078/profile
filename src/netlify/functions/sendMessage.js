// This is your serverless function to handle the contact form submission.
// It runs on Netlify's backend infrastructure, not in the browser.

exports.handler = async function(event, context) {
    // 1. Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ message: 'Only POST requests are allowed' }),
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        // 2. Basic Validation: Ensure all fields are present
        if (!name || !email || !message) {
            return {
                statusCode: 400, // Bad Request
                body: JSON.stringify({ message: 'Name, email, and message are required.' }),
            };
        }

        // 3. Email Format Validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
             return {
                statusCode: 400, // Bad Request
                body: JSON.stringify({ message: 'Please provide a valid email address.' }),
            };
        }

        // --- WHERE THE MAGIC HAPPENS ---
        // At this point, you would integrate with a transactional email service.
        // For example, using SendGrid, Mailgun, or Resend.
        // You would use their SDK and an API key (stored as a secret
        // environment variable in the Netlify UI) to send the email.
        
        // Example with a hypothetical email service:
        //
        // const sendgrid = require('@sendgrid/mail');
        // sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
        //
        // const emailToSend = {
        //   to: 'alex.doe@example.com', // Your email address
        //   from: 'contact-form@yourwebsite.com', // A verified sender email
        //   subject: `New message from ${name}`,
        //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        // };
        //
        // await sendgrid.send(emailToSend);

        // For this example, we'll just simulate a success response.
        console.log(`Received message from ${name} (${email}): "${message}"`);

        // 4. Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully!' }),
        };

    } catch (error) {
        console.error('Error processing submission:', error);
        // Return a generic server error
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal error occurred. Please try again later.' }),
        };
    }
};
