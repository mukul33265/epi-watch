const path = require('path') ;
const userData = require('../models/userDatabase') ;
const hospitalData = require('../models/hospitalDatabase');


// get and post request for the user login
exports.userlogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}
exports.postuserlogin = (req,res,next) => {
    const {email,password} = req.body;
    // console.log(email,password);
    console.log(req.body) ;

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
    res.sendFile(path.join(__dirname,'../','views','hospital-login.html'));
}
exports.posthospitallogin = (req,res,next) => {
    const {email,password} = req.body ;
    // console.log(email,password);
    console.log(req.body) ;

    res.redirect('/home');
}


// get and post request for hospital signup
exports.hospitalregister = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','hospital-signup.html'));
}
exports.posthospitalsignup = (req,res,next) => {

    const {name,email,password,phone_no,location} = req.body ;
    
    const data = new hospitalData(name,email,password,phone_no,location) ;
    data.save();

    console.log(req.body);
    res.redirect('/home');
}


// others 
exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html')) ;
}
