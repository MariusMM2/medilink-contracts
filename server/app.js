const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

require("./db/db_connection");
const Config = require("./config/config");
const userRouter = require("./routers/user.router");

const app = express();
const port = Config.PORT || 3000;

// enabling cors policy
app.use(cors());

// parse application/x-www-form-urlencoded, so that the value of the key can be of any type
app.use(bodyParser.urlencoded({extended:true}));

// parse application/json
app.use(bodyParser.json());

// using the route
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});