require('dotenv').config();
const cors = require("cors")

const path = require('path');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
// routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(cors());
// app.set('trust proxy', 1);


app.use(express.json());
app.use(helmet());

app.use(xss());

// routes
app.get("/",(req,res)=>{
  res.write(`<p>Server is running</p>`)
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
