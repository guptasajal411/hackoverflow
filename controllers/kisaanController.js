const Kisaan = require("../models/kisaanModel");

exports.postLogin = function(req, res){
    Kisaan.findOne({email: req.body.identifier}, async function(err, foundKisaan){
        if (err) {
            res.send(err);
        } else {
            if (foundKisaan == null){
                console.log("kisaan not found");
                const newKisaan = new Kisaan({
                    email: req.body.identifier
                });
                await newKisaan.save();
                console.log("newKisaan saved!")
                res.redirect("/");
            } else {
                console.log("kisaan found: " + foundKisaan);
            }
        }
    })
    res.send("received at backend");
}

// {
//     user_id: '5f6d8c22-3edd-457c-89ad-b710a9f75050',
//     created_on: '2021-10-23T08:04:52.218000Z',
//     identifier: 'gekegi9120@ateampc.com',
//     identifier_type: 'email',
//     verification_token: '5bDViyZcDMJbdFzqH9MbEbFRqnCckhN4pUyh',
//     customFieldInputValues: {}
// }