import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';

import './database/index';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import tokenRoutes from './routes/tokenRoutes';
import equipmentRoutes from './routes/equipmentRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/login/', loginRoutes);
    this.app.use('/token/', tokenRoutes);
    this.app.use('/equipment/', equipmentRoutes);
  }
}

export default new App().app;
