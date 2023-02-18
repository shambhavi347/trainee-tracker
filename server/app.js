const express = require("express");
require("./db/database");

const http = require("http");
const cookieparser = require("cookie-parser");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config1.env" });
const PORT = process.env.PORT;

const server = http.createServer(app);

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieparser());

app.use(express.json());
app.use(require("./router/adminRoute"));

//MiddleWare

// const middleware = (req, res, next) => {
//   console.log("Hello from MW");
//   next();
// };

// app.get("/", (req, res) => {
//   console.log(`hello main page`);
//   res.send(`hello about from the server`);
// });

// app.get("/admin-dashboard", middleware, (req, res) => {
//   console.log(`hello admin`);
//   res.send(`hello admin about from the server`);
// });

// app.get("/reg-institute", (req, res) => {
//   console.log(`hello insititute`);
//   res.send(`hello insititute about from the server`);
// });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
