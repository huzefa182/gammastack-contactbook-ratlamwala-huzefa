import HttpStatus from 'http-status';
import { errorResponse } from '../helpers';
import models from '../models';

const User = models.user;
const jwt = require('jsonwebtoken');

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return errorResponse(req, res, 'Token is not provided', HttpStatus.UNAUTHORIZED);
  }

  const parts = req.headers.authorization.split(' ');
  if (parts.length === 2) {
    if (!(/^Bearer$/i.test(parts[0]))) {
      return errorResponse(req, res, 'Token is not properly formatted', HttpStatus.UNAUTHORIZED);
    }
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const user = await User.scope('withSecretColumns').findOne({
      where: { email: req.user.email },
    });
    if (!user) {
      return errorResponse(req, res, 'User is not found in system', HttpStatus.UNAUTHORIZED);
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided, try re-login',
      HttpStatus.UNAUTHORIZED,
    );
  }
};

export default apiAuth;
