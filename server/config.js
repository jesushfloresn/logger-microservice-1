// config.js
require("dotenv").config();

const env = process.env.NODE_ENV; // 'dev', 'test' or 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3003,
  },
  db: {
    url: process.env.DEV_DB_HOST || "localhost",
    user: process.env.DEV_DB_USER || "logger_admin",
    password: process.env.DEV_DB_PASSWORD || "32SsNeiy",
    database: process.env.DEV_DB_NAME || "logger_database",
    port: parseInt(process.env.DEV_DB_PORT) || 5432,
  },
};

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 3003,
  },
  db: {
    url: process.env.TEST_DB_HOST || "localhost",
    user: process.env.TEST_DB_USER || "logger_admin",
    password: process.env.TEST_DB_PASSWORD || "32SsNeiy",
    database: process.env.TEST_DB_NAME || "logger_database",
    port: parseInt(process.env.TEST_DB_PORT) || 5432,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT) || 3003,
  },
  db: {
    url: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    port: parseInt(process.env.PROD_DB_PORT) || 5432,
  },
};

const config = {
  dev,
  test,
  prod,
};

module.exports = config[env];
