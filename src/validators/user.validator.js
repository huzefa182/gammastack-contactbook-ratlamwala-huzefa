import Joi from 'joi';
import { validateRequest } from '../helpers';

export const validateGetOtherUserProfile = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const schema = Joi.object({
      userId: Joi.number().required(),
    });
    await validateRequest(bodyData, schema);
    next();
  } catch (error) {
    return res.status(400).json({ success: false, data: null, error, message: '' });
  }
};

export const validateChangePassword = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    });
    await validateRequest(bodyData, schema);
    next();
  } catch (error) {
    return res.status(400).json({ success: false, data: null, error, message: '' });
  }
};

export const validateRegister = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
        language: {
          any: {
            allowOnly: 'Confirm password must be same as password.',
          },
        },
      }),
    });

    await validateRequest(bodyData, schema);
    next();
  } catch (error) {
    return res.status(400).json({ success: false, data: null, error, message: '' });
  }
}

export const validateLogin = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    await validateRequest(bodyData, schema);
    next();
  } 
  catch (error) {
    return res.status(400).json({ success: false, data: null, error, message: '' });
  }
}

export const validateContact = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      address: Joi.string().required(),
    });

    await validateRequest(bodyData, schema);
    next();
  } 
  catch (error) {
    return res.status(400).json({ success: false, data: null, error: error, message: '' });
  }
}