import Joi from 'joi';

export const userValidator = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').optional(),
});
