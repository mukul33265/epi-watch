const mongoose = require('mongoose') ;


const hospitalSchema = mongoose.Schema({
    email : {
        type : String ,
        required : [true , "Email is required"] ,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password : {
        type : String ,
        required : true ,
        minlength : 6
    },
    phoneNo : {
        type : String ,
        minlength : 10 ,
        required : true , 
    },
    name : {
        type : String ,
        required : true ,
    },
    location : {
        type : String ,
        required : true ,
    }
})

module.exports = mongoose.model('hospitalData',hospitalSchema) ;

