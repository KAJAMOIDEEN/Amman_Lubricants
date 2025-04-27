const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transport using SMTP (you can use a service like Gmail or SendGrid)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use Gmail, SendGrid, or other services
      auth: {
        user: process.env.EMAIL_USER, // Add your email address in environment variables
        pass: process.env.EMAIL_PASS, // Add your email password in environment variables
      },
    });

    // Set up email data
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // The email where you want to receive messages
      subject: `New message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
