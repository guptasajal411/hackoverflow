const storageModel = require("../models/storageModel.js");
const Kisaan = require("../models/kisaanModel");
const path = require("path");

exports.getStatus = function(req, res){
    storageModel.find({}, function(err, foundStorages){
        if (err){
            res.send(err);
        } else {
            res.render("status.ejs", { foundStorages: foundStorages });
        }
    });
}

exports.postStatus = function(req, res){
    storageModel.findOne({storageName: req.body.storageName}, async function(err, foundStorage){
        if (err){
            res.send(err);
        } else {
            foundStorage.availableStorage = req.body.availableStorage;
            await foundStorage.save();
            res.redirect("/status");
            Kisaan.find({}, function(err, foundKisaan){
                if (err) {
                    res.send(err);
                } else {
                    foundKisaan.yeild.forEach(function(crop){
                        if (crop.quantity < req.body.availableStorage){
                            // send notification to kisaan
                        }
                    })
                }
            })
        }
    });

}

exports.getHome = function(req, res){
    res.render(path.join(__dirname, "../views/index"));
}