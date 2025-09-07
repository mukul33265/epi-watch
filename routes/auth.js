const express = require('express');

const authRouter = express.Router() ;

const authController = require('../controllers/authControllers');

authRouter.use(express.urlencoded( {extended : true} ));
authRouter.use(express.json()) ;


authRouter.get('/user-login',authController.userlogin);
authRouter.post('/user-login',authController.postuserlogin) ;

authRouter.get('/user-register',authController.usersignup);
authRouter.post('/user-register',authController.postusersignup);

authRouter.get('/hospital-login',authController.hospitallogin);
authRouter.post('/hospital-login',authController.posthospitallogin);

authRouter.get('/hospital-register',authController.hospitalregister);
authRouter.post('/hospital-register',authController.posthospitalsignup);



module.exports = authRouter ;