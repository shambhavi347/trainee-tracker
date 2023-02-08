const express = require("express");
require("./db/database");

const app = express();

//MiddleWare

const middleware = (req, res, next) => {
  console.log("Hello from MW");
  next();
};

app.get("/", (req, res) => {
  console.log(`hello main page`);
  res.send(`hello about from the server`);
});

app.get("/admin-dashboard", middleware, (req, res) => {
  console.log(`hello admin`);
  res.send(`hello admin about from the server`);
});

app.get("/reg-institute", (req, res) => {
  console.log(`hello insititute`);
  res.send(`hello insititute about from the server`);
});

app.listen(3000, () => {
  console.log(`server is running on 3000 `);
});
