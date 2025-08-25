const path = require('path');

exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

exports.userlogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}

exports.usersignup = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}

exports.hospitallogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}

exports.hospitalregister = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}

exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html'));
}


