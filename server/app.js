const express = require("express");

const http = require("http");
const cookieparser = require("cookie-parser");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

const server = http.createServer(app);

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieparser());

require("./db/database");

app.use(express.json());

//link router file for routing
app.use(require("./router/adminRoute"));
app.use(require("./router/studentRoute"));
app.use(require("./router/instituteRoute"));
app.use(require("./router/traineeRegRoute"));
app.use(require("./router/coordinatorRoute"));
app.use(require("./router/documentRoute"));

server.listen(PORT, () => {
  console.log(`server is running on port no. ${PORT}`);
});
