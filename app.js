// external modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// local modules 
const userRouter = require('./routes/user');
const hostRouter = require('./routes/host');
const authRouter = require('./routes/auth');

const app = express() ;

// serve everything inside "views" folder (css, html, images)
app.use(express.static(path.join(__dirname, "views")));

// views folder will have .ejs files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(userRouter);
app.use(hostRouter);
app.use(authRouter);

// const PATHS 
const PORT = 3000;
const DB_PATH = "mongodb+srv://mukulkumar7707:mukul%40abc@mukul.sshtzha.mongodb.net/healthcareDB?retryWrites=true&w=majority&appName=mukul";

const store = new MongoDBStore({
  uri : DB_PATH ,
  collection : 'session'
})

app.use(session({
  secret : "Healtalert system",
  resave : false ,
  saveUninitialized : true ,
  store 
}));


// connection to the server and database
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
