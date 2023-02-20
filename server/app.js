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

//MiddleWare

// const middleware = (req, res, next) => {
//   console.log("Hello from MW");
//   next();
// };

// const adminAuth = require("./middleware/adminauth");

// app.get("/admin-dashboard", (req, res) => {
//   console.log(`hello admin`);
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

server.listen(PORT, () => {
  console.log(`server is running on port no. ${PORT}`);
});
