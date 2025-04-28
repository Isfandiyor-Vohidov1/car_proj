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

const sendMail = async (mailMessage) => {
    try {
        const info = await transporter.sendMail(mailMessage);
        console.log('Letter was sent: ' + info.response);
    } catch (error) {
        console.error('Error sending:', error);
        throw error;
    }
};

export default sendMail;
