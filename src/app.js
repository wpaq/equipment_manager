import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import csrf from 'csurf';
import cors from 'cors';
import helmet from 'helmet';

import './database/index';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import tokenRoutes from './routes/tokenRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import { middlewareGlobal, checkCsrfError, csrfMiddleware } from './middlewares/middleware';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());    
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
    this.app.use(express.static('public'));
    this.app.use(session({
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true 
        }
    }));
    this.app.use(flash());
    this.app.use(csrf());
    this.app.use(middlewareGlobal);
    this.app.use(checkCsrfError);
    this.app.use(csrfMiddleware);

    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views');
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/login/', loginRoutes);
    this.app.use('/token/', tokenRoutes);
    this.app.use('/equipment/', equipmentRoutes);
    this.app.use('*', function (req, res) {
        res.render('404');
    })
  }
}

export default new App().app;
