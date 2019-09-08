var express=require('express');
var app=express();
var hbs = require('hbs');
app.set('view engine', 'hbs');
app.use(express.static('public'));
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
            style:'individual.css'
        })
});

app.listen(3000);