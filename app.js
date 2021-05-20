import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import firebaseAdmin from 'firebase-admin';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import routes from './src/routes';
import errorHandler from './src/middleware/errorHandler';
import models from './src/models';
import config from './src/config';

const { sequelize } = models;

const swaggerDefinition = {
  info: {
    title: 'REST API for GAMMASTACK Contact Book Application',
    version: '1.0.0',
    description: 'This is the REST API for GAMMASTACK Contact Book Application',
  },
  host: `${config.app.swaggerHost}`,
  basePath: '/api',
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      description: 'JWT authorization for API(s)',
      name: 'Authorization',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./api-docs/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);

if (config.app.environment === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.google.firebase_json),
});

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    await sequelize.sync().then(() => {
      console.log('Database sync successfully');
    }).catch((error) => {
      console.log('Database syncing error %s', error);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

routes(app);

module.exports = app;
