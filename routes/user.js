const express = require('express');
const userRouter = express.Router();
const usercontroller = require('../controllers/usercontrollers');

userRouter.get('',usercontroller.home);

userRouter.get('/home',usercontroller.home);

userRouter.get('/about',usercontroller.addsoon);

userRouter.get('/terms',usercontroller.addsoon);

userRouter.get('/learn-more',usercontroller.addsoon);

userRouter.get('/user-dashboard',usercontroller.getuserdashboard);

userRouter.get('/change-password',usercontroller.addsoon);

userRouter.get('/how-it-works',usercontroller.addsoon);

userRouter.get('/login-google',usercontroller.addsoon);

module.exports = userRouter ;