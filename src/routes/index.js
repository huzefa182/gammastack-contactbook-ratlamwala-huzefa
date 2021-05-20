import { Router } from 'express';
import HttpStatus from 'http-status';
import account from './account';
import admin from './admin';
import contact from './contact';

const router = Router();
const register = (app) => {

  app.use(router);

  const commonRoutes = [
    account,
    admin,
    contact
  ];

  app.use('/api', commonRoutes);

  app.use((error, req, res, next) => {

    if (!error.status || error.status == HttpStatus.INTERNAL_SERVER_ERROR) {
      // loggers.InternalErrorLogger.info(`${JSON.stringify(error)}`);
      console.log('internal error', `${new Date()}`, error.status, error);
    }
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      error,
      message: (!error.status) ? 'Internal Server Error' : error.message
    });
  });

  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = HttpStatus.NOT_FOUND;
    res.status(error.status).json({
      success: false,
      data: null,
      error,
      message: error.message,
    });
  });
};

export default register;