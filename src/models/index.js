import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';
import pg from 'pg';
import config from '../config';

const basename = _basename(__filename);
const env = config.app.environment || 'development';
const dbConfig = require(`${__dirname}/../config/database.js`)[env];
const db = {};

pg.defaults.ssl = true;
let sequelize = new Sequelize(`${config.app.databaseUrl}?sqlmode=true`, {
  timezone: config.app.timezone,
  logging: false,
  dialect: config.app.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    //timestamps: true,
    //freezeTableName: true,
    underscored: true
  }
});

readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Address);
// db.Address.belongsTo(db.User);

export default db;