var express = require('express');
var profile = require('./profileRouter')

var app = express();
var hbs = require('hbs');
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

app.use('/profile', profile)

app.get('/trending', function (req, res) {
    res.render('trending.hbs', {
        title: 'TRENDING',
        style: 'trending.css'
    })
});

app.get('/video/:id', function (req, res) {
    res.render('individual.hbs', {
        title: 'INDIVIDUAL PAGE',
        style: 'individual.css'
    })
});

app.listen(3000);