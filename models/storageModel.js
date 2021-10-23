const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://" + process.env.usernameMongoDB + ":" + process.env.password + "@cluster0.xgjts.mongodb.net/hackoverflowDB");

const storageSchema = new mongoose.Schema({
    totalStorage: Number,
    availableStorage: Number,
    storageName: String
});

const Storage = new mongoose.model("Storage", storageSchema);

// const newStorage = new Storage({
//     totalStorage: 1000,
//     availableStorage: 900,
//     storageName: "rice storage"
// })

// newStorage.save();

module.exports = Storage;