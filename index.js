var express = require('express');
var app = express();
app.use(express.urlencoded());
var hbs = require('hbs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

var db;
mongoClient.connect(url, function (err, client) {
    if (err)
        throw err;
    db = client.db('webtube');
})
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html')
});

app.get('/home', function (req, res) {
    res.render('home.hbs', {
        title: 'HOME',
        style: 'home.css'
    })
});

app.get('/profile', function (req, res) {
    res.render('profile.hbs', {
        title: 'PROFILE',
        style: 'profile.css'
    })
});

app.get('/trending', function (req, res) {
    res.render('trending.hbs', {
        title: 'TRENDING',
        style: 'trending.css'
    })
});

app.get('/video/:id', function (req, res) {
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

app.post('/postComment', function (req, res) {

    var videoID = req.body.videoId;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    req.body['dateTime'] = dateTime;

    db.collection('comments').insertOne(req.body);
    res.redirect('/video/' + videoID);
})



app.get('/getComments/:videoId', function (req, res) {
    var videoId = req.params.videoId;
    db.collection('comments').find({ videoId: videoId }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})

app.post('/addToList', function (req, res) {

    var videoID = req.body.videoId;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    req.body['dateTime'] = dateTime;

    db.collection('playlists').insertOne(req.body);
    console.log(req.body)
    res.redirect('/video/' + videoID);
})

app.get('/getLikes/:id', function (req, res) {
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

app.post('/pushUserName/:userName/:videoId', function (req, res) {
    var userName = req.params.userName;
    var videoId = req.params.videoId;
    db.collection('likes').updateOne({ videoId: videoId }, { $push: { userNames: userName }, $inc: { likes: 1 } }, function (error, result) {
        if (error) throw error
        res.json(result);
    })
})




app.listen(3000);