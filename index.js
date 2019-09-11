var express = require('express');
var profile = require('./profileRouter');
var auth= require('./authrouter');
var individual=require('./individualrouter');
var app = express();
app.use(express.urlencoded());
var hbs = require('hbs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());   
var mongoClient = require('mongodb').MongoClient;
var url ='mongodb+srv://sagar:kumar@cluster0-ralg6.mongodb.net/webTubeDB?retryWrites=true&w=majority';

mongoClient.connect(url, function (err, client) {
    if (err)
        throw err;
app.locals.db = client.db('webTubeDB');
})
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/authrouter', auth);

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