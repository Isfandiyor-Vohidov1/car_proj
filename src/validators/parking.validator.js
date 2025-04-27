import Joi from 'joi';

export const parkingValidator = Joi.object({
    location: Joi.string().required(),
    slotNumber: Joi.number().required(),
    isBooked: Joi.boolean().required(),
    bookedBy: Joi.string().optional(),
    car: Joi.string().optional(),
    bookedAt: Joi.date().optional()
});
