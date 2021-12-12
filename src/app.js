import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';

import homeRoutes from './routes/homeRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import loginRoutes from './routes/loginRoutes';

class App {
    constructor() {
        this.app = express();
        this.app.set('views', path.resolve(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', homeRoutes);
        this.app.use('/equipment', equipmentRoutes);
        this.app.use('/login', loginRoutes);
    }
}

export default new App().app;
