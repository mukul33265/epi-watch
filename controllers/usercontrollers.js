const { error } = require('console');
const path = require('path');

exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html'));
}

exports.getuserdashboard = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        const errors = ["Please log in to access the dashboard"];
        return res.render('login', {
            errors,
            oldInput : {email : "" , password : ""}
        });
    }

    res.render('userDash', {
        user: req.session.user
    });
};

