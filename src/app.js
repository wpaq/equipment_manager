import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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
    this.app.set('trust proxy', 1);
    this.app.use(session({
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());

    
    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views');
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
