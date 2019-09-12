var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded());
router.use(express.static('public'));

router.get('/video/:id', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.session.userName;
        var videoID = req.params.id;
        res.render('individual.hbs', {
            title: 'INDIVIDUAL PAGE',
            style: 'individual.css',
            script: '../individual.js',
            videoID: videoID,
            userName: userName,
            profilepic:req.session.profilepic


        })
    }
    else
        res.redirect("/");
});

router.post('/postComment', function (req, res) {
    if (req.session.loggedIn == true) {
        var videoID = req.body.videoId;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        req.body['dateTime'] = dateTime;

        var db = req.app.locals.db;
        db.collection('comments').insertOne(req.body);
        res.redirect('/individual/video/' + videoID);
    }
    else
        res.redirect("/");
})



router.get('/getComments/:videoId', function (req, res) {
    if (req.session.loggedIn == true) {
        var videoId = req.params.videoId;
        var db = req.app.locals.db;
        db.collection('comments').find({ videoId: videoId }).toArray(function (error, result) {
            if (error) throw error
            res.json(result)
        })
    }
    else
        res.redirect("/");
})

router.post('/addToList', function (req, res) {
    if (req.session.loggedIn == true) {

        var videoID = req.body.videoId;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        req.body['dateTime'] = dateTime;

        var db = req.app.locals.db;
        db.collection('playlists').insertOne(req.body);
        res.redirect('/individual/video/' + videoID);
    }
    else
        res.redirect('/');
})

router.get('/getLikes/:id', function (req, res) {
    if (req.session.loggedIn == true) {
        var videoId = req.params.id;
        var db = req.app.locals.db;
        db.collection('likes').find({ videoId: videoId }).toArray(function (error, result) {
            if (error) throw error
            if (result.length == 0) {
                var obj = { "videoId": videoId, "likes": 0, "userNames": [] }
                res.json([{ "likes": 0 }]);
                db.collection('likes').insertOne(obj);
            }
            else
                res.json(result);
        })
    }
    else
        res.redirect('/');
})

router.post('/pushUserName/:userName/:videoId', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var videoId = req.params.videoId;
        var db = req.app.locals.db;
        db.collection('likes').updateOne({ videoId: videoId }, { $push: { userNames: userName }, $inc: { likes: 1 } }, function (error, result) {
            if (error) throw error
            res.json(result);
        })
    }
    else
        res.redirect('/');
})
module.exports = router;