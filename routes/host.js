const express = require('express') ;
const hostRouter = express.Router() ;
const path = require('path') ;
const { urlToHttpOptions } = require('url');
const hostController = require('../controllers/hostcontrollers') ;


hostRouter.use(express.urlencoded( {extended : true} ));
hostRouter.use(express.json()) ;


hostRouter.get('/user-login',hostController.userlogin);

hostRouter.post('/user-login',hostController.postuserlogin) ;

hostRouter.get('/user-register',hostController.usersignup);

hostRouter.post('/user-register',hostController.postusersignup);

hostRouter.get('/hospital-login',hostController.addsoon);

hostRouter.get('/hospital-register',hostController.addsoon);

module.exports = hostRouter ;
