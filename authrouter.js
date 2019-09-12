var express = require('express');
var router = express.Router();
var session = require("express-session");


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
    res.sendFile(__dirname + "/public/forgot1.html")
})

router.post("/check", function (req, res) {
    var db = req.app.locals.db;
    db.collection('loginData').find().toArray(function (error, result) {
        if (error) throw error;

        for (var i = 0; i < result.length; i++) {

            if (req.body.email == result[i].email && req.body.password == result[i].password) {
                req.session.loggedIn = true;
                req.session.userName = result[i].userName; 
                break;
            }

        }
        res.redirect("/authrouter/user")
    });


})

router.post("/checkemailAndAns", function (req, res) {
    
    var db = req.app.locals.db;

    db.collection('loginData').find().toArray(function (error, result) {
        if (error) throw error;
        var counter = 0;
        
        for (var i = 0; i < result.length; i++) {

            if (req.body.email == result[i].email && req.body.securityA == result[i].securityA) {
                db.collection('loginData').updateOne({email:req.body.email},{$set:{password:req.body.password}})
                counter++;
                break;
            }

        }
        if(counter==0)
        res.send(`<h3>Your credential is not correct, please try again... </h3>
         <p>Go <a href="/authrouter/forgot">back</a></p>`);
        else
        res.redirect("/");
        
        
    
    

})

})

router.get("/user", function (req, res) {
    if (req.session.loggedIn == true) {

        res.redirect("/home")
    } else {
        res.redirect("/");
    }
});


router.post("/adduser", function (req, res) {
    var db = req.app.locals.db;
    db.collection('loginData').insertOne(req.body);
    res.send("done");
})


router.post("/validation", function (req, res) {
    var db = req.app.locals.db;
    db.collection('loginData').find({}).toArray(function (error, result) {
        if (error) throw error;
        var ecounter = 0;
        var ucounter = 0;
        for (var i = 0; i < result.length; i++) {

            if (req.body.email == result[i].email) {
                ecounter++;
                break;
            }
            if (req.body.username == result[i].userName) {
                ucounter++;
                break;
            }


        }
        if (ecounter == 1 && ucounter == 1) {
            res.send("11")
        }
        else if (ecounter == 1) {
            res.send("5");
        }
        else if (ucounter == 1) {
            res.send("4");
        }
        else
            res.send("0");


    })

});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/")
})

module.exports = router;