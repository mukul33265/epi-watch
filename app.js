const express = require('express');
const path = require('path');
const app = express() ;
const userRouter = require('./routes/user');
const hostRouter = require('./routes/host');

// serve everything inside "views" folder (css, html, images)
app.use(express.static(path.join(__dirname, "views")));

app.use(userRouter);
app.use(hostRouter);


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server starts listening at http://localhost:${PORT}`);
})