var express=require('express');
var app=express();

app.get('/',function(req,res){
    res.send("LOGIN PAGE")
});

app.get('/home',function(req,res){
    res.send("HOME")
});

app.get('/profile',function(req,res){
    res.send("PROFILE")
});

app.get('/trending',function(req,res){
    res.send("TRENDING")
});

app.get('/video/:id',function(req,res){
    res.send("INDIVIDUAL VIDEO PAGE")
});

app.listen(8080);