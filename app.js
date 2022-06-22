require("dotenv").config();
//async errors

require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMddleware = require("./middleware/error-handler");

//middleware

app.use(express.json());

//route
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v2/products">products route</a>');
});

app.use("/api/v2/products", productsRouter);

//product route

app.use(notFoundMiddleware);
app.use(errorMddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
