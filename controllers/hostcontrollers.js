const path = require('path') ;
const userData = require('../models/userDatabase') ;


// get and post request for the user login
exports.userlogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}
exports.postuserlogin = (req,res,next) => {
    console.log(req.body) ;
    const e_mail = req.body.email ;
    const pass = req.body.password ;
    console.log(e_mail,pass);

    //as of now.....
    res.redirect('/home');
}


// get and post request for user signup
exports.usersignup = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}
exports.postusersignup = (req,res,next) => {
    const {email,password,phone_no,userName,age,location} = req.body ;
    console.log(req.body);
    const data = new userData(email,password,phone_no,userName,age,location) ;
    data.save() ; 

    // redirect to other page as of now ..........
    res.redirect('/home');
}


// get and post request for hospital login 
exports.hospitallogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}


// get and post request for hospital signup
exports.hospitalregister = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}


// others 
exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html')) ;
}
