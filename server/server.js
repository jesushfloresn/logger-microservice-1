const express = require("express");
const { Client } = require("pg");
const config = require("./config");

const {
  db: { url, user, password, database },
} = config;

const connectionString = `postgres://${user}:${password}@${url}:5432/${database}`;

const client = new Client({
  connectionString: connectionString,
});

client.connect();
var app = express();
const port = config.app.port;

app.set("port", port);
app.get("/", function (req, res, next) {
  client.query("SELECT * FROM Employee", [], function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.listen(port, function () {
  console.log(`Server is running.. on Port ${port}`);
});
