const express = require('express') ;
const hostRouter = express.Router() ;
const path = require('path') ;
const { urlToHttpOptions } = require('url');
const hostController = require('../controllers/hostcontrollers') ;

module.exports = hostRouter ;
