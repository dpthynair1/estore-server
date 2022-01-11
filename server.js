const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
require("dotenv").config();

// Import routes
//const appRoutes = require('./routes/auth')

// App
const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(`DB connection error`));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware && autoload all the routes
//app.use('/api', appRoutes);

fs.readdirSync("./routes").map((r) => 
app.use('/api', require('./routes/' + r))
)

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
