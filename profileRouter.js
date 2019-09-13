var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.session.userName;

        res.render('profile.hbs', {
            title: 'PROFILE',
            style: 'profile.css',
            script: 'profile.js',
            userName: userName,
            profilepic: req.session.profilepic
        })

    }
    else
        res.redirect('/');

});

router.get('/getLikedVideos/:userName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var db = req.app.locals.db;
        db.collection('likes').find({ userNames: userName }).toArray(function (error, result) {
            if (error) throw error
            res.json(result)
        })
    }
    else
        res.redirect('/')
})

router.get('/getWatchLaterVideos/:userName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var db = req.app.locals.db;
        db.collection('playlists').find({ playlistName: "WatchLater", userName: userName }).toArray(function (error, result) {
            if (error) throw error
            res.json(result)
        })
    }
    else
        res.redirect('/')
})

router.get('/getMyPlaylistVideos/:userName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var db = req.app.locals.db;
        db.collection('playlists').find({ playlistName: "myPlaylist", userName: userName }).toArray(function (error, result) {
            if (error) throw error
            res.json(result)
        })
    }
    else
        res.redirect('/')
})

router.get('/getFavouritesVideos/:userName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var db = req.app.locals.db;
        db.collection('playlists').find({ playlistName: "favourites", userName: userName }).toArray(function (error, result) {
            if (error) throw error
            res.json(result)
        })
    }
    else
        res.redirect('/')
})


router.post('/removeFromList/:userName/:videoId/:playlistName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var videoId = req.params.videoId;
        var playlistName = req.params.playlistName;
        var db = req.app.locals.db;
        db.collection('playlists').deleteOne({ videoId: videoId, userName: userName, playlistName: playlistName }, function (error, result) {
            if (error) throw error
            res.redirect("/profile");
        })
    }
    else
        res.redirect('/')
})


router.post('/popUserName/:userName/:videoId', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var videoId = req.params.videoId;
        var db = req.app.locals.db;
        db.collection('likes').updateOne({ videoId: videoId }, { $pull: { userNames: userName }, $inc: { likes: -1 } }, function (error, result) {
            if (error) throw error
            res.redirect("/profile");
        })
    }
    else
        res.redirect('/')
})

router.get('/deleteProfile/:userName', function (req, res) {
    if (req.session.loggedIn == true) {
        var userName = req.params.userName;
        var db = req.app.locals.db;
        db.collection('loginData').deleteOne({ userName: userName }, function (error, result) {
            if (error)
                throw error
            res.redirect('/authrouter/logout');
        })
    }
    else
        res.redirect('/')
});

module.exports = router;