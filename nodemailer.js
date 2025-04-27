// nodemailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async () => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'nodemailer run successfully',
            text: 'Hi!',
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Letter was sent: ' + info.response);
    } catch (error) {
        console.error('Error sending:', error);
    }
};

export default sendMail;

