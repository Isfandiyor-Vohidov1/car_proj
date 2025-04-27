import mongoose from 'mongoose';
import Car from "../models/car.model.js";
import { catchError } from "../utils/error-response.js";
import { carValidator } from "../validators/car.validator.js";

export class CarController {
    // Создание нового автомобиля
    async createCar(req, res) {
        try {
            const { error, value } = carValidator.validate(req.body);
            if (error) {
                throw new Error(`Error creating: ${error.details[0].message}`);
            }

            const { user, plateNumber, model, color } = value;
            if (!mongoose.Types.ObjectId.isValid(user)) {
                throw new Error('Invalid user ID');
            }

            const userId = new mongoose.Types.ObjectId(user);
            const newCar = await Car.create({ user: userId, plateNumber, model, color });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newCar
            });

        } catch (error) {
            catchError(error, res);
        }
    }
    async getAllCars(_, res) {
        try {
            const cars = await Car.find().populate('user');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: cars
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getCarById(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findById(id).populate('user');
            if (!car) {
                throw new Error('Car not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: car
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateCarById(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findById(id);
            if (!car) {
                throw new Error('Car not found');
            }
            const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedCar
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteCarById(req, res) {
        try {
            const id = req.params.id;
            const car = await Car.findById(id);
            if (!car) {
                throw new Error('Cannot find car');
            }
            await Car.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}
