import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import { userEmail, userPassword } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const [authType, token] = authHeader.split(' ');

        // JWT авторизация
        if (authType === 'Bearer' && token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = decoded;
                return next();
            } catch (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
        }

        if (authType === 'Basic' && token) {
            const [login, password] = Buffer.from(token, 'base64')
                .toString()
                .split(':');

            const user = await User.findOne({ email: userEmail }).exec();
            if (
                user &&
                user.email === login &&
                user.password === password
            ) {
                req.user = { email: user.email }
                return next();
            }
        }

        res.status(401).send('Authentication required.');
    } catch (err) {
        console.error("Error in authMiddleware", err);
        next(err);
    }
};
