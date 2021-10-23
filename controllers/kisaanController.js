const md5 = require('md5');
const Kisaan = require("../models/kisaanModel");
const storageModel = require("../models/storageModel.js");

exports.postLogin = function (req, res) {
    Kisaan.findOne({ email: req.body.email }, async function (err, foundKisaan) {
        if (err) {
            res.send(err);
        } else {
            if (foundKisaan == null) {
                console.log("kisaan not found");
                const newKisaan = new Kisaan({
                    name: req.body.name,
                    email: req.body.email,
                    password: md5(req.body.password)
                });
                await newKisaan.save();
                console.log("newKisaan saved!")
                res.redirect("/");
            } else {
                console.log("kisaan found: " + foundKisaan);
                if (md5(req.body.password) == foundKisaan.password) {
                    storageModel.find({}, function (err, foundStorages) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.render("kisaan", { kisaan: foundKisaan, foundStorages: foundStorages });
                        }
                    });
                } else {
                    res.send("wrong password");
                }
            }
        }
    });
}

exports.getKisaan = function (req, res) {
    res.render("kisaan");
}

exports.postKisaan = function (req, res) {
    Kisaan.findOne({ email: req.body.email }, async function (err, foundKisaan) {
        if (err) {
            res.send(err);
        } else {
            foundKisaan.yeild.push({
                cropName: req.body.cropName,
                quantity: req.body.quantity
            });
            await foundKisaan.save();
            res.redirect("/");
        }
    });
}