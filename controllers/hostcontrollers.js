const path = require('path') ;







// others 
exports.addsoon = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','add-soon.html')) ;
}
