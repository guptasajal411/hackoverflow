const storageModel = require("../models/storageModel.js");

exports.getStatus = function(req, res){
    storageModel.find({}, function(err, foundStorages){
        if (err){
            res.send(err);
        } else {
            res.render("status.ejs", {foundStorages: foundStorages});
        }
    });
}

exports.postStatus = function(req, res){
    storageModel.findOne({storageName: "rajasthan storage"}, async function(err, foundStorage){
        if (err){
            res.send(err);
        } else {
            foundStorage.availableStorage = req.body.availableStorage;
            await foundStorage.save();
            res.redirect("/");
        }
    });
}