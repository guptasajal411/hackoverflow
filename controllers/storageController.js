const storageModel = require("../models/storageModel.js");
const Kisaan = require("../models/kisaanModel");
const path = require("path");
// const nodemailer = require('nodemailer');
const { CourierClient } = require("@trycourier/courier");

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
                    if (foundKisaan) {
                        foundKisaan.forEach(function (kisaan) {
                            kisaan.yeild.forEach(async function (crop) {
                                if (crop.cropName == req.body.storageName) {
                                    if (crop.quantity < req.body.availableStorage) {
                                        const courier = CourierClient({ authorizationToken: process.env.AUTH_TOKEN });
                                        const { messageId } = await courier.send({
                                            brand: "1M05TH69ZW4HQBN1BZDN6HWX9HPA",
                                            eventId: "67F4VDDBR3MJPYKYMJ1B2ANFN5A6",
                                            recipientId: "95298f93-0ee3-4650-9c10-e57482a2c1c3",
                                            profile: {
                                                email: process.env.email,
                                            },
                                            data: {
                                            },
                                            override: {
                                            },
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