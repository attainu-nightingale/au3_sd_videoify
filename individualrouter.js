var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded());
router.use(express.urlencoded());
var mongoClient = require('mongodb').MongoClient;
var url ='mongodb+srv://sagar:kumar@cluster0-ralg6.mongodb.net/webTubeDB?retryWrites=true&w=majority';

var db;
mongoClient.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true }, function (err, client) {
    if (err)
        throw err;
    db = client.db('webTubeDB');
})
router.use(express.static('public'));
router.get('/video/:id', function (req, res) {
    // var userName = req.session.userName;
    var videoID = req.params.id;
    res.render('individual.hbs', {
        title: 'INDIVIDUAL PAGE',
        style: 'individual.css',
        script: '../individual.js',
        videoID: videoID,
        userName: "anjali"

    })
});

router.post('/postComment', function (req, res) {

    var videoID = req.body.videoId;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    req.body['dateTime'] = dateTime;

    db.collection('comments').insertOne(req.body);
    res.redirect('/individual/video/' + videoID);
})



router.get('/getComments/:videoId', function (req, res) {
    var videoId = req.params.videoId;
    db.collection('comments').find({ videoId: videoId }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})

router.post('/addToList', function (req, res) {

    var videoID = req.body.videoId;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    req.body['dateTime'] = dateTime;

    db.collection('playlists').insertOne(req.body);
    console.log(req.body)
    res.redirect('/individual/video/' + videoID);
})

router.get('/getLikes/:id', function (req, res) {
    var videoId = req.params.id;
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
})

router.post('/pushUserName/:userName/:videoId', function (req, res) {
    var userName = req.params.userName;
    var videoId = req.params.videoId;
    db.collection('likes').updateOne({ videoId: videoId }, { $push: { userNames: userName }, $inc: { likes: 1 } }, function (error, result) {
        if (error) throw error
        res.json(result);
    })
})
module.exports = router;