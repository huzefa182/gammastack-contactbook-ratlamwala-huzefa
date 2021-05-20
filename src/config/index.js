import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    environment: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    timezone: process.env.DB_TIMEZONE,
    swaggerHost: process.env.SWAGGER_HOST,
  },
  google: {
    project_id: process.env.GOOGLE_PROJECT_ID || 'gammastack-contactbook-huzefa',
    firebase_json: path.join(__dirname, 'firebase', 'firebase-adminsdk.json'),
  },
};
