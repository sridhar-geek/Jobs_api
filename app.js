const express = require('express');
const app = express();

      // IMPORTS
require('dotenv').config();
require('express-async-errors');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//MongoDb connect 
const connectDB = require("./db/connect")

// routes
const userRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')
const authenication = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());    // without this function we can't be albe to access req.body elements 
app.use( helmet() )
app.use( cors() )
app.use( xss() )
app.use(  rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
}) )


      // Middleware Routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/auth', userRoutes)
app.use('/api/jobs',authenication, jobsRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;

// function which connects to mongodb and starts our server
const start = async () => {
  try {
         // driver
     await connectDB(process.env.MONGO_URL)
     app.listen(port, () =>
     console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
};

start();

