//-- SETUP : REQUIRING

var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override");



//-- SETUP : APP CONFIG    

mongoose.connect("mongodb://localhost:27017/syntakes_app", { useNewUrlParser:true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(methodOverride("_method"));


//-- TEMPORARY MODEL AREA   
var SyntakeSchema = new mongoose.Schema({
    method    : String,
    syntax    : String,
    parameter : {
        first : String,
        second: String,
        third : String,
        fourth: String
    },
    example   : {
        value : String,
        result: String
    },
    notes     : String,
    type      : String 
});

var Syntake = mongoose.model("Syntake", SyntakeSchema);


//-- ROUTES

// Index Route
app.get("/syntakes", function(req, res) {
    Syntake.find( {}, function(err, foundSyntakes) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundSyntakes);
            res.render("index", { syntakes: foundSyntakes });
        }
    });
});

// New Form Route 
app.get("/syntakes/new", function(req, res) {
    res.render("new");
});

// Create Route
app.post("/syntakes", function(req, res) {
    Syntake.create(req.body.syntake, function(err, newSyntake) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log(newSyntake);
            res.redirect("/syntakes");
        }
    });
});

// Edit Form Route
app.get("/syntakes/:id/edit", function(req, res) {
    Syntake.findById(req.params.id, function(err, foundSyntake) {
        if (err){
            console.log(err);
            red.redirect("back");
        } else {
            res.render("edit", { syntake: foundSyntake });
        }
    });
});

// Update Route
app.put("/syntakes/:id", function(req, res) {
    Syntake.findByIdAndUpdate(req.params.id, req.body.syntake, function(err, updatedSyntake) {
        if (err) {
            console.log(err);
            red.redirect("back");
        } else{
            console.log(updatedSyntake);
            res.redirect("/syntakes");
        }
    });
});

// Destroy Route
app.delete("/syntakes/:id", function(req, res) {
    Syntake.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/syntakes");
        }
    });
});


//-- PORT
app.listen(3000, function() {
    console.log("Server is RUNNING");
})