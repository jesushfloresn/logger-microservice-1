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
app.get("/logger-api/v1", function (req, res, next) {
  client.query("SELECT * FROM public.logs", [], function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.post("/logger-api/v1", function (req, res, next) {
  if (!req.body || !req.body.log) {
    return res.status(401).send({ message: "Bad request no log object" });
  }
  const { event, admin_user } = req.body.log;
  if (!event || !admin_user) {
    return res
      .status(401)
      .send({ message: "Bad request missing event or admin_user" });
  }
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let trunkIp = ip;
  if (ip.length > 15) {
    trunkIp = ip.substr(0, 15);
  }
  client.query(
    "INSERT INTO public.logs(date, event, admin_user, ip) VALUES(now(), $1, $2, $3)",
    [event, admin_user, trunkIp],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      return res.status(200).send({
        message: `log saved - event: ${event} by admin_user: ${admin_user}`,
      });
    }
  );
});

app.listen(appPort, function () {
  console.log(`Server is running.. on port ${appPort}`);
});
