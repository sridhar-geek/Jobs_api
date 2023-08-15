const express = require('express');
const app = express();

      // IMPORTS
require('dotenv').config();
require('express-async-errors');
//MongoDb connect 
const connectDB = require("./db/connect")
// routes
const userRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());    // without this function we can't be albe to access req.body elements 


      // Middleware Routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/auth', userRoutes)
app.use('/api/jobs', jobsRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;

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

