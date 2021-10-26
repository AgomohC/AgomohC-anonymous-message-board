//require and initialize dotenv
require("dotenv").config();

// require and initialize error middleware
require("express-async-errors");

// require and initialize express
const express = require("express");
const app = express();

//require cors
const cors = require("cors");

//require helmet
const helmet = require("helmet");

//require express rate limit
const rateLimit = require("express-rate-limit");

//import routes
const messageRouter = require("./routes/message-routes");

//import notfound and error handler middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// configure rate limiter for reverse proxies
app.set("trust proxy", 1);

//configure rate limiter to allow only 100 requests from a client every 15 minutes
app.use(
  rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(helmet());

app.use(express.static("./public"));

app.use("/api", messageRouter);

app.use(notFound);

app.use(errorHandler);

//require db connection function
const connect = require("./db/connect");

// initialize port variable
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    //connect to db
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
