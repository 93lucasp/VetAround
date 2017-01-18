var Place = require("../models/place");
var mongoose = require('mongoose');

var placesController = {
    /* Index function called in the routes; */
    index: function(req, res) {
        /* Find query of mongoose the find all the values of the collection; */
        Place.find({}, function(err, docs) {
            if (err) returnError(err);
            /* For each element of docs, find the one with the same id of the postedby */
            docs.forEach(function(place) {
                User.findOne({ _id: place.postedBy[0] }, function(err, user) {
                    place.user = user;
                });
            });
            /* Getting the current user; */
            req.currentUser(function() {
                docs.forEach(function(place) {

                    if (req.user) {
                        // console.log("posted by111•–•", typeof place.postedBy[0]);
                        // console.log("req user •••••••••••••", req.user);
                        // console.log("posted by222•-•", typeof req.user._id);
                        var placePostedBy = JSON.stringify(place.postedBy[0]);
                        var userId = JSON.stringify(req.user._id);
                        if (placePostedBy == userId) {
                            place.canDelete = true;
                        } else {
                            place.canDelete = false;
                        }
                    }
                    // console.log("can delete?????:", place.canDelete);
                });
            });
            /* Sending value to the frontend page under the veterinary name*/
            res.render("index", { veterinary: docs });
        }).sort({ createdAt: -1 }); /* With .sort I am going to order the result of the find for the latest creater; */
    },

    /* create function called in the routes; */
    create: function(req, res) {
        // console.log("req body 1111:", req.body);
        /* Create query of mongoose */
        Place.create(req.body, function(err, place) {
            // console.log("place----",place);
            // console.log("session user id----", req.session.userId);
            /* Pushing inside the array postedBy the user id; */
            place.postedBy.push(req.session.userId);
            // console.log("place----after pushing",place);
            place.save(function(err) {
                if (err) console.log("error: ", err);
            });
            /* if there there is an error: send status 500 and going to the fail function in the client side(app.js); else: send status 200 and going to the done function in the client side(app.js); */
            err ?
                res.sendStatus(500) : res.sendStatus(200);
            // console.log("req body 2222:", place);
        });
    },

    createComment: function(req, res) {
        Place.findById(req.body.placeId, function(err, place) {
            place.comments.push(req.body);

            place.save(function(err) {
                if (!err) console.log('Success!');
            });
            err ?
                res.sendStatus(500) : res.json(req.body.rate);
        });
    },

    

    /* Only to check the places created */
    apiPlaces: function(req, res) {
        Place.find({}, function(err, places) {
            err ?
                res.sendStatus(500) : res.status(200).send(JSON.stringify(places));
            // res.status(200).send(JSON.stringify(places));
        });
    },

    /* Only to check the places created */
    welcome: function(req, res) {
        res.render("welcome");
    },

    /* Show function called in the routes; */
    show: function(req, res) {
        var id = req.params.id;
        /* FindByid query of mongoose that find only the one with the id that i get from params.id;*/
        Place.findById(id, function(err, place) {
            /* Getting the current user */
            req.currentUser(function() {
                if (req.user) {

                    var postedBy = JSON.stringify(place.postedBy[0]); /* Converting to a string to compare; */
                    var userId = JSON.stringify(req.user._id); /* Converting the object to a string to compare; */
                    // console.log("posted by111•–•", typeof postedBy + postedBy);
                    // console.log("req user •••••••••••••", req.user);
                    // console.log("posted by222•-•", typeof userId + userId);
                    /* Looking if the user id is the same of the postedBy of the place; */
                    if (postedBy == userId) {
                        place.canDelete = true;
                    } else {
                        place.canDelete = false;
                    }
                }
                // console.log("can delete?????:", place.canDelete);
                /* Sending the value to the frontend with the name that i want; */
                res.render("show", { namePlace: place.namePlace, nameDoc: place.nameDoc, city: place.city, address: place.address, id: place.id, postedBy: place.postedBy, canDelete: place.canDelete });
            });

        });
    },


    /* Destroy function called in the routes; */
    destroy: function(req, res) {
        var id = req.params.id;
        /* Remove query of mongoose that remove only the one with the correct id; */
        Place.remove({ _id: id }, function(err, place) {
            /* if there there is an error: send status 500; else: send status 200 and going to the success function in the client side(app.js); */
            err ?
                res.sendStatus(500) : res.sendStatus(200);
        });
    },
    /* Update function called in the routes; */
    update: function(req, res) {
        var id = req.params.id;
        /* Update query of mongoose that update only the one with the correct id that i get from params.id; */
        Place.findById(id, function(err, place) {
            /* Checking for errors or if i have values; */
            if (err) returnError(err);
            if (req.body.namePlace) place.namePlace = req.body.namePlace;
            if (req.body.nameDoc) place.nameDoc = req.body.nameDoc;
            if (req.body.address) place.address = req.body.address;
            if (req.body.city) place.city = req.body.city;
            /* Promise mongoose (need to study promises); */
            place.save(function(err, updatedPlace) {
                err ?
                    res.sendStatus(500) : res.json(updatedPlace);

            });
        });
    }
};

module.exports = placesController;
