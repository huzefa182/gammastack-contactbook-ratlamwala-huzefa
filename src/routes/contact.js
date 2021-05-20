import express from 'express';
import * as userController from '../controllers/user/user.controller';
import { validateContact } from '../validators/user.validator';
import apiMiddleware from '../middleware/apiAuth';

const router = express.Router();

router.post(
  '/user/contact',
  validateContact,
  apiMiddleware,
  userController.addContact,
);

module.exports = router;
