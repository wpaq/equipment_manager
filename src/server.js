import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.APP_PORT;
app.listen(port);
