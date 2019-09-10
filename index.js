var express=require('express');
var auth= require('./authrouter');
var app=express();
app.use(express.urlencoded());
var hbs = require('hbs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());   
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use('/authrouter', auth);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/login.html')
});

app.get('/home',function(req,res){
    res.render('home.hbs',{
        title:'HOME',
        style:'home.css'
    })
});

app.get('/profile',function(req,res){
        res.render('profile.hbs',{
            title:'PROFILE',
            style:'profile.css'
        })
});

app.get('/trending',function(req,res){
        res.render('trending.hbs',{
            title:'TRENDING',
            style:'trending.css'
        })
});

app.get('/movies',function(req,res){
    res.render('trending.hbs',{
        title:'MOVIES',
        style:'movies.css'
    })
});

app.get('/video/:id',function(req,res){
    res.render('individual.hbs',{
            title:'INDIVIDUAL PAGE',
            style:'individual.css',
            script:'../individual.js'
        })
        app.post('/video/:id',function(req,res){
            db.collection('comments').insertOne(req.body);
            console.log(req.body);
            res.redirect('/video/:id')
                })
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));