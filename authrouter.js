var express = require('express');
var router = express.Router();
var session = require ("express-session");
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb+srv://sagar:kumar@cluster0-ralg6.mongodb.net/webTubeDB?retryWrites=true&w=majority';
var db;

MongoClient.connect(url, { useUnifiedTopology: true,useNewUrlParser: true }, function (error, client) {
    if (error)
        throw error;

    db = client.db('webTubeDB');
});


var bodyParser = require("body-parser");
router.use(
    session({
        secret: "express session secret"
    })
);


router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static("public"));
router.use(bodyParser.json());


router.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/public/signup.html")
})

router.get("/forgot", function (req, res) {
    res.sendFile(__dirname + "/public/forgot.html")
})

router.post("/check",function(req,res){
    db.collection('loginData').find().toArray(function(error,result){
        if(error) throw error;
        
        for(var i=0;i<result.length; i++){
            
            if(req.body.email == result[i].email && req.body.password == result[i].password){
                req.session.loggedIn = true;
            }
            
        }
        res.redirect("/authrouter/user")
    });
    

})

router.get("/user",function(req,res){
    if(req.session.loggedIn == true){
        res.sendFile(__dirname + "/public/forgot.html")
    } else{
        res.redirect("/");
    }
});


router.post("/adduser", function (req, res) {
    db.collection('loginData').insertOne(req.body);
    console.log(req.body)
    
})



module.exports = router;