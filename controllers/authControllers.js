const path = require('path') ;
const {check,validationResult} = require('express-validator');
const bcrypt = require("bcrypt");

// local modules
const User = require('../models/userDatabase') ;
const hospital = require('../models/hospitalDatabase');
const { error } = require('console');

// -------------------------------------------- //

// get and post request for the (user login)

exports.postuserlogin = async (req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if(!user) {
        return res.status(422).render('login',{
            errors : ["User not found"],
            oldInput : {email,password}
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(422).render('login',{
            errors : ["Invalid Password"],
            oldInput : {email,password}
        })
    }
    
    req.session.isLoggedIn = true ;
    req.session.user = user ;
    await req.session.save() ;

    res.render('userDash',{
        user : req.session.user ,
    });
}

exports.userlogin = (req,res,next)=>{

        if(req.session.isLoggedIn === true ){
            return res.render('userDash',{
                user : req.session.user 
            });
        }
        res.render('login' , {
            errors : [],
            oldInput : {email : "" , password : ""}
        })
    
}

exports.postuserlogout = (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
}

// ----------------------------------------------  // 


// get and post request for (user signup)
exports.usersignup = (req,res,next) => {
    res.render('signup',{
        errors : [] ,
        oldInput : {email : "" , password : "" , userName : "" , name : "" , age : "" , location : "" ,phoneNo : ""}
    })
}
exports.postusersignup = [
   
    check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    check("password")
        .isLength({min : 8})
        .withMessage("Password should be atleast 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain atleast one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password should contain atleast one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password should contain atleast one number")
        .matches(/[!@&]/)
        .withMessage("Password should contain atleast one special character")
        .trim(),

    check("phoneNo")
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),

    // Username
    check("userName")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters"),
    //   .matches(/^[a-zA-Z0-9_]+$/)
    //   .withMessage("Username can only contain letters, numbers, and underscores"),

    // Age
    check("age")
      .isInt({ min: 12, max: 120 })
      .withMessage("Age must be a number between 12 and 120"),

    // Location
    check("location")
      .notEmpty()
      .withMessage("Location is required")
      .isLength({ min: 3 })
      .withMessage("Location must be at least 3 characters long"),
    
    check("name")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must be between 3 and 20 characters"),
    //   .matches(/^[a-zA-Z0-9_]+$/)
    //   .withMessage("Username can only contain letters, numbers, and underscores"),

    
    (req,res,next) => {
        console.log(req.body) ;
        const {email,password,phoneNo,userName,age,location,name} = req.body ;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render('signup',{
                errors : errors.array().map(err => err.msg),
                oldInput : {email,password,phoneNo,userName,age,location,name}
            }) 
        }

        bcrypt.hash(password,12)
        .then(hashedPassword => {
            const user = new User({email,password : hashedPassword,userName,name,age,location,phoneNo});
            user.save() ;
        })
        .then(() => {
            res.redirect('/user-login');
        })
        .catch(err => {
            return res.status(422).render('signup',{
                errors : [err.message],
                oldInput : {email,password,phoneNo,userName,age,location,name}
            })
        })
    }

]


// ------------------------------------------------------------------------------------------- // 

// get and post request for (hospital login )
exports.hospitallogin = (req,res,next)=>{
    if(req.session.isHospitalLoggedIn === true) {
        return res.render('hospitalDash', {
            hospital: req.session.hospital
        });
    }
    res.render('hospital-login' , {
        errors : [],
        oldInput : {email : "" , password : ""}
    })
}
exports.posthospitallogin = async (req,res,next) => {
    const {email,password} = req.body ;
    const hosp = await hospital.findOne({email});
    if(!hosp) {
        return res.status(422).render('hospital-login',{
            errors : ["User not found"],
            oldInput : {email,password}
        })
    }

    const isMatch = await bcrypt.compare(password,hosp.password);

    if(!isMatch) {
        return res.status(422).render('hospital-login',{
            errors : ["Invalid Password"],
            oldInput : {email,password}
        })
    }

    req.session.isHospitalLoggedIn = true;
    req.session.hospital = hosp;
    await req.session.save();

    res.render('hospitalDash', {
        hospital: hosp
    });
}


// --------------------------------------------- // 


// get and post request for ( hospital signup)
exports.hospitalregister = (req,res,next)=>{
    res.render('hospital-signup',{
        errors : [],
        oldInput : {name : "" , email : "" , password : "" , phoneNo : "" , location : ""}
    })
}

// Hospital logout
exports.posthospitallogout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.posthospitalsignup = [
    
    check("name")
      .isLength({ min: 3, max: 20 })
      .withMessage("name must be between 3 and 20 characters"),
    //   .matches(/^[a-zA-Z0-9_]+$/)
    //   .withMessage("name can only contain letters, numbers, and underscores"),

    check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    check("password")
        .isLength({min : 8})
        .withMessage("Password should be atleast 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain atleast one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password should contain atleast one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password should contain atleast one number")
        .matches(/[!@&]/)
        .withMessage("Password should contain atleast one special character")
        .trim(),

    check("phoneNo")
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),

    // Location
    check("location")
      .notEmpty()
      .withMessage("Location is required")
      .isLength({ min: 3 })
      .withMessage("Location must be at least 3 characters long"),

    (req,res,next) => {
        const {name,email,password,phoneNo,location} = req.body ;
        console.log(req.body);
        const errors = validationResult(req) ;
        if(!errors.isEmpty()){
            res.status(422).render('hospital-signup',{
                errors : errors.array().map(err => err.msg),
                
                oldInput : {name,email,password,phoneNo,location}
            })
        }

        bcrypt.hash(password,12)
        .then(hashedPassword => {
            const hospitalData = new hospital({name,email,password : hashedPassword,phoneNo,location})
            return hospitalData.save() ;
        })
        .then(()=>{
            res.redirect('/hospital-login');
        })
        .catch(err => {
            return res.status(422).render('hospital-signup',{
                errors : [err.message],
                oldInput : { name, email, password, phoneNo, location }

            })
        })
    }

]