const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors")

// define router
const router = require("./routes");

// define app 
const app = express();

// body parser to get data from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  import router here

app.use(router.userRouter);

// app.use(cors())

// export router back to index.js
module.exports = app;



