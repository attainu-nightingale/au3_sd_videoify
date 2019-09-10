var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

var db;
mongoClient.connect(url, function (err, client) {
    if (err)
        throw err;
    db = client.db('webtube');
})


router.get('/', function (req, res) {

    //var userName:req.session.userName;

    db.collection('loginData').find({ userName: "userName*" }).toArray(function (error, result) {
        if (error) throw error
        if (result[0].gender == "male")
            var profilepic = "../profileMale.png";
        else if (result[0].gender == "female")
            var profilepic = "../profileFemale.png";

        res.render('profile.hbs', {
            title: 'PROFILE',
            style: 'profile.css',
            script: 'profile.js',
            userName: "userName*",
            profilepic: profilepic
        })
    })

});

router.get('/getLikedVideos/:userName', function (req, res) {
    var userName = req.params.userName;
    db.collection('likes').find({ userNames: userName }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})

router.get('/getWatchLaterVideos/:userName', function (req, res) {
    var userName = req.params.userName;
    db.collection('playlists').find({ playlistName: "WatchLater", userName: userName }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})

router.get('/getMyPlaylistVideos/:userName', function (req, res) {
    var userName = req.params.userName;
    db.collection('playlists').find({ playlistName: "myPlaylist", userName: userName }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})

router.get('/getFavouritesVideos/:userName', function (req, res) {
    var userName = req.params.userName;
    db.collection('playlists').find({ playlistName: "favourites", userName: userName }).toArray(function (error, result) {
        if (error) throw error
        res.json(result)
    })
})


router.post('/removeFromList/:userName/:videoId/:playlistName', function (req, res) {
    var userName = req.params.userName;
    var videoId = req.params.videoId;
    var playlistName = req.params.playlistName;
    db.collection('playlists').deleteOne({ videoId: videoId, userName: userName, playlistName: playlistName }, function (error, result) {
        if (error) throw error
        res.redirect("/profile");
    })
})


router.post('/popUserName/:userName/:videoId', function (req, res) {
    var userName = req.params.userName;
    var videoId = req.params.videoId;
    db.collection('likes').updateOne({ videoId: videoId }, { $pull: { userNames: userName }, $inc: { likes: -1 } }, function (error, result) {
        if (error) throw error
        res.redirect("/profile");
    })
})

router.get('/deleteProfile/:userName', function (req, res) {
    var userName = req.params.userName;
    db.collection('loginData').deleteOne({ userName: userName }, function (error, result) {
        if (error)
            throw error
        res.redirect('/home');
    })
});

module.exports = router;