var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// campgrounds get
// INDEX Route - show all campgrounds
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// campgrounds post
// CREATE Route - add new to DB
router.post("/", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function (err, createdCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

// new campground form
//NEW - show form to create new campground
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});    
        }
    });
});

module.exports = router;