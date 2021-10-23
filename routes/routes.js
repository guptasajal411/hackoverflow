const express = require("express");
const app = express();

const kisaanController = require("../controllers/kisaanController");
const storageController = require("../controllers/storageController");

app
    .route("/")
    .get(storageController.getHome)
    .post(kisaanController.postLogin);

app.
    route("/kisaan")
    .get(kisaanController.getKisaan)
    .post(kisaanController.postKisaan)
app
    .route("/status")
    .get(storageController.getStatus)
    .post(storageController.postStatus);

module.exports = app;