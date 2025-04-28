import Admin from "../models/admin.model.js";
import { catchError } from "../utils/error-response.js";
import { adminValidator } from "../utils/admin.validation.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generate-token.js";
import { getCache, setCache } from '../utils/cache.js';
import { otpGenerator } from '../utils/otp-generator.js';
import sendMail from '../../nodemailer.js';

export class AdminController {
    async createSuperadmin(req, res) {
        try {
            const { error, value } = adminValidator(req.body);
            if (error) return catchError(res, 400, error);

            const { username, password } = value;
            const checkSuperAdmin = await Admin.findOne({ role: 'superadmin' });
            if (checkSuperAdmin) return catchError(res, 409, 'Superadmin already exists');

            const hashedPassword = await decode(password, 7);
            const superadmin = await Admin.create({ username, hashedPassword, role: 'superadmin' });

            return res.status(200).json({
                statusCode: 200,
                message: 'Superadmin created successfully',
                data: superadmin
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async createAdmin(req, res) {
        try {
            const { error, value } = adminValidator(req.body);
            if (error) return catchError(res, 400, error);

            const { username, password } = value;
            const hashedPassword = await decode(password, 7);
            const admin = await Admin.create({ username, hashedPassword, role: 'admin' });

            return res.status(200).json({
                statusCode: 200,
                message: 'Admin created successfully',
                data: admin
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async signinAdmin(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) return catchError(res, 404, 'Admin not found');

            const isMatchPassword = await encode(password, admin.hashedPassword);
            if (!isMatchPassword) return catchError(res, 400, 'Invalid password');

            const otp = otpGenerator();
            const mailMessage = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'Full stack N20 - OTP',
                text: `Your OTP code: ${otp}`,
            };

            await sendMail(mailMessage);
            await setCache(admin.username, otp);

            return res.status(200).json({
                statusCode: 200,
                message: 'OTP sent to your email',
                data: {}
            });
        } catch (error) {
            console.error('Error in signinAdmin:', error);
            return catchError(res, 500, error.message);
        }
    }

    async confirmSigninAdmin(req, res) {
        try {
            const { username, otp } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) return catchError(res, 400, 'Admin not found');

            const otpCache = getCache(username);
            if (!otpCache || otp !== otpCache) {
                return catchError(res, 400, 'OTP expired or invalid');
            }

            const payload = { id: admin._id, role: admin.role };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30d
            });

            return res.status(200).json({
                statusCode: 200,
                message: 'Signin successful',
                data: accessToken
            });
        } catch (error) {
            console.error('Error in confirmSigninAdmin:', error);
            return catchError(res, 500, error.message);
        }
    }

    async getAllAdmins(_, res) {
        try {
            const admins = await Admin.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admins
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async getAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) return catchError(res, 404, 'Admin not found');

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admin
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async updateAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) return catchError(res, 404, 'Admin not found');

            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedAdmin
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async deleteAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) return catchError(res, 404, 'Admin not found');

            if (admin.role === 'superadmin') {
                return catchError(res, 400, 'Cannot delete superadmin');
            }

            await Admin.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }
}
