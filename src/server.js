import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.APP_PORT;
app.listen(port, "0.0.0.0", function() {
    console.log(`Listening on Port ${port}`);
});
