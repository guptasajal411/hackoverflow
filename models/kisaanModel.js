const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://" + process.env.usernameMongoDB + ":" + process.env.password + "@cluster0.xgjts.mongodb.net/hackoverflowDB");

const kisaanSchema = new mongoose.Schema({
    email: String,
    yeild: [{
        cropName: String,
        quantity: Number
    }]
});

const Kisaan = new mongoose.model("Kisaan", kisaanSchema);

module.exports = Kisaan;