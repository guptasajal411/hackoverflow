const storageModel = require("../models/storageModel.js");
const Kisaan = require("../models/kisaanModel");
const path = require("path");
const nodemailer = require('nodemailer');

exports.getStatus = function (req, res) {
    storageModel.find({}, function (err, foundStorages) {
        if (err) {
            res.send(err);
        } else {
            res.render("status.ejs", { foundStorages: foundStorages });
        }
    });
}

exports.postStatus = function (req, res) {
    storageModel.findOne({ storageName: req.body.storageName }, async function (err, foundStorage) {
        if (err) {
            res.send(err);
        } else {
            foundStorage.availableStorage = req.body.availableStorage;
            await foundStorage.save();
            res.redirect("/status");
            Kisaan.find({}, function (err, foundKisaan) {
                if (err) {
                    res.send(err);
                } else {
                    if (foundKisaan){
                        foundKisaan.forEach(function(kisaan){
                            kisaan.yeild.forEach(function(crop){
                                if (crop.cropName == req.body.storageName){
                                    if(crop.quantity < req.body.availableStorage){
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: process.env.email,
                                                pass: process.env.emailPassword
                                            }
                                        });
                                        var mailOptions = {
                                            from: process.env.email,
                                            to: kisaan.email,
                                            subject: "There's space for your crops!",
                                            html: `Hi, ` + kisaan.name + `! Your ` + crop.cropName + ` can be now stored at the warehouse!`
                                        };
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                res.send(error);
                                            } else {
                                                res.redirect("/status");
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        console.log("no kisaan found");
                    }
                }
            });
        }
    });
}

exports.getHome = function (req, res) {
    res.render(path.join(__dirname, "../views/index"));
}