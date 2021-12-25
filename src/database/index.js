import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Equipment from '../models/Equipment';
import User from '../models/User';

const models = [User, Equipment];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
