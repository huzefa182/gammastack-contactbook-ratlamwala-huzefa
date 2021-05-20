import express from 'express';

import * as userController from '../controllers/user/user.controller';
import { validateLogin, validateRegister, validateChangePassword } from '../validators/user.validator';

import apiMiddleware from '../middleware/apiAuth';

const router = express.Router();

router.post(
  '/account/login',
  validateLogin,
  userController.login,
);

router.post(
  '/account/register',
  validateRegister,
  userController.register,
);

router.get('/account/me', apiMiddleware, userController.profile);

router.post(
  '/account/changePassword',
  validateChangePassword,
  apiMiddleware,
  userController.changePassword,
);

module.exports = router;
