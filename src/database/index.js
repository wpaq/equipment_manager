import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Equipment from '../models/Equipment';
import QRCodeImage from '../models/QRCodeImage';
import User from '../models/User';

const models = [User, Equipment, QRCodeImage];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
