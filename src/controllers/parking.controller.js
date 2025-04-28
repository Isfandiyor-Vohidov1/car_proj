import parking from '../models/parking.model.js';
import { catchError } from "../utils/error-response.js";
import { parkingValidator } from "../validators/parking.validator.js";

export class parkingController {
    async createParking(req, res) {
        try {
            const { error, value } = parkingValidator.validate(req.body);
            if (error) {
                throw new Error(`Error creating: ${error.message}`);
            } 

            

            const newParking = await parking.create(value);
            return res.status(201).json({
                statusCode: 201,
                message: 'Parking created successfully',
                data: newParking
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAllParks(_, res) {
        try {
            const parks = await parking.find().populate('car bookedBy');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: parks
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getParkById(req, res) {
        try {
            const id = req.params.id;
            const foundPark = await parking.findById(id).populate('car bookedBy');
            if (!foundPark) {
                throw new Error('Parking slot not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: foundPark
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateParkById(req, res) {
        try {
            const id = req.params.id;
            const updated = await parking.findByIdAndUpdate(id, req.body, { new: true }).populate('car bookedBy');
            if (!updated) {
                throw new Error('Parking slot not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updated
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteParkById(req, res) {
        try {
            const id = req.params.id;
            const deleted = await parking.findByIdAndDelete(id);
            if (!deleted) {
                throw new Error('Parking slot not found');
            }
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
