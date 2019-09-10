var express = require('express');
var individual=require('./individualrouter');
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

app.get('/trending',function(req,res){
        res.render('trending.hbs',{
            title:'TRENDING',
            style:'trending.css',
            script: "/trending.js"
        })
});

app.get('/movies',function(req,res){
    res.render('movies.hbs',{
        title:'MOVIES',
        style:'movies.css',
        script: "/movies.js"
    });
});

app.use('/individual',individual);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));