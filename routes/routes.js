const express = require("express");
const app = express();

const storageController = require("../controllers/storageController");

app
    .route("/")
    .get(storageController.getStatus)
    .post(storageController.postStatus);

module.exports = app;