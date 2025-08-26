const path = require('path');

exports.home = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html'));
}


