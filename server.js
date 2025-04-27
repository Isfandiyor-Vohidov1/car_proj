import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoutes from './src/routes/user.routes.js';
import carRouter from './src/routes/car.routes.js';
import parkingRouter from './src/routes/parking.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import adminRoutes from './src/routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import sendMail from "./nodemailer.js";


dotenv.config();

const app = express();

app.use(cookieParser())
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/car', carRouter);
app.use('/parking', parkingRouter)

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        sendMail()
    });

}).catch((error) => {
    console.error('Error during server startup:', error);
    process.exit(1);
});
