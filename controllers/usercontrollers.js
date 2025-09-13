const { error } = require('console');
const path = require('path');
const Disease = require('../models/diseaseDatabase'); 

exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html'));
}

exports.getuserdashboard = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        const errors = ["Please log in to access the dashboard"];
        return res.render('login', {
            errors,
            oldInput : {email : "" , password : ""}
        });
    }
    const userCity = req.session.user.location ;
    const diseaseData = await Disease.find({ City: new RegExp('^' + userCity + '$', 'i') });
    console.log(diseaseData) ;
    res.render('userDash', {
        user: req.session.user ,
        data : diseaseData
    });
};

