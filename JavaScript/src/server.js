import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connnectDB from "./config/connnectDB";
require('dotenv').config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', './src/views');
app.set('view engine', 'ejs');

viewEngine(app);
initWebRoutes(app);
connnectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})