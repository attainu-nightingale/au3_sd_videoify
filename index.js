var express=require('express');
var auth= require('./authrouter');
var app=express();

app.use('/authrouter', auth);
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/login.html")
});

app.listen(8080);