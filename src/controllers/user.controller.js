import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { catchError } from '../utils/error-response.js';
import { userValidator } from '../validators/user.validator.js';

export class UserController {
    async createUser(req, res) {
        try {
            const { error, value } = userValidator.validate(req.body);
            if (error) throw new Error(error.details[0].message);

            const { email, name, password, role } = value;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({ email, name, password: hashedPassword, role });

            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: newUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: users
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) throw new Error('User not found');

            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) throw new Error('User not found');

            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) throw new Error('User not found');

            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}
