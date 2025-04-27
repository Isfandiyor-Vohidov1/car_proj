import Joi from 'joi';

export const carValidator = Joi.object({
    user: Joi.string().required(),
    plateNumber: Joi.string().min(3).max(20).required(),
    model: Joi.string().min(1).max(50).required(),
    color: Joi.string().min(3).max(30).required()
});
