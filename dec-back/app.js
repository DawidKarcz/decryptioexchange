const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');



//Setting up config.env file variables
dotenv.config({path: './config/config.env'});

// Handling Uncaught Exception
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

//Connecting to database
connectDatabase();


//Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent parameter pollution
app.use(hpp());

// Setup CORS - Accessible by other domains
app.use(cors());


app.use(bodyParser.json());

// parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// auth routes:
const {verifyRegister}  = require("./middlewares");
const { authJwt } = require("./middlewares");
const controller = require("./controllers/authController");
const user_controller = require("./controllers/userController");
const exchange_controller = require("./controllers/exchangeController")

app.get("/exchange", exchange_controller.notDefined );
app.get("/exchange/price", exchange_controller.notDefined);
    app.get("/exchange/price/:coin", function (req, res) {
        exchange_controller.getCurrentPriceString(req, res)
    });
    app.get("/exchange/information", exchange_controller.notDefined);
    app.get("/exchange/information/:coin", function (req, res) {
        exchange_controller.getInformationString(req, res)
    });

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post(
    "/auth/register",
    [
        verifyRegister.checkDuplicateUsernameOrEmail
    ],
    controller.register
);
    
app.post("/auth/login", controller.login);

// user endpoints with verifyToken and verifyBalance/coins middlewares

app.post("/user/balance", [authJwt.verifyToken], user_controller.getUserBalance);

app.post("/user/buy", [authJwt.verifyToken, user_controller.verifyBalance], user_controller.buy);

app.post("/user/sell", [authJwt.verifyToken, user_controller.verifyCoins], user_controller.sell);

app.post("/user/value", [authJwt.verifyToken], user_controller.getUserValue);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.
    NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejections
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to handled promise rejection.')
  server.close( () => {
      process.exit(1);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app
