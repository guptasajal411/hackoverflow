const CourierClient = require("@trycourier/courier").default;
const storageModel = require("../models/storageModel.js");
const Kisaan = require("../models/kisaanModel");
const path = require("path");

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
            const courier = CourierClient({ authorizationToken: process.env.AUTH_TOKEN });
            const { messageId } = await courier.send({
                brand: "1M05TH69ZW4HQBN1BZDN6HWX9HPA",
                eventId: "KMHX6KM7WAMFX5Q9NMAHE9WQW0RR",
                recipientId: "f479e483-0174-4d5a-94ea-71307001b70b",
                profile: {
                    email: "priyankaafssulur@gmail.com",
                },
                data: {
                },
                override: {
                },
            });
            res.redirect("/status");
            // Kisaan.find({}, function (err, foundKisaan) {
            //     if (err) {
            //         res.send(err);
            //     } else {
            //         foundKisaan.yeild.forEach(async function (crop) {
            //             if (crop.quantity < req.body.availableStorage) {
            //                 // send notification to kisaan
            //             }
            //         });
            //     }
            // });
        }
    });
}

exports.getHome = function (req, res) {
    res.render(path.join(__dirname, "../views/index"));
}