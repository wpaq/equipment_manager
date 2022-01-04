import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.use(bodyParser.urlencoded())
app.set('view engine', 'ejs');
app.set('views', './src/views');

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is running on port " + port);
});
