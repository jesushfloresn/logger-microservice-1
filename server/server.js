const express = require("express");
var bodyParser = require("body-parser");
const { Client } = require("pg");
const config = require("./config");

const {
  db: { url, user, password, database, port },
} = config;

const connectionString = `postgres://${user}:${password}@${url}:${port}/${database}`;

const client = new Client({
  connectionString: connectionString,
});

client.connect();
var app = express();
const appPort = config.app.port;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.set("port", appPort);
app.get("/", function (req, res, next) {
  client.query("SELECT * FROM public.logs", [], function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.post("/", function (req, res, next) {
  if (!req.body || !req.body.log) {
    return res.status(401).send({ message: "Bad request no log object" });
  }
  const { event, user } = req.body.log;
  return res
    .status(200)
    .send({ message: `log saved - event ${event} by user ${user}` });
});

app.listen(appPort, function () {
  console.log(`Server is running.. on port ${appPort}`);
});
