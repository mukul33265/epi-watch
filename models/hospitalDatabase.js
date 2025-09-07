const mongoose = require('mongoose') ;

// module.exports =  class hospitalData {
//     constructor(email,password,phone_no,name,location,){
//         this.email = email ;
//         this.password = password ;
//         this.phone_no = phone_no ;
//         this.name = name ;
//         this.location = location ;
//     }

// }

const hospitalSchema = mongoose.Schema({
    email : {
        type : String ,
        required : [true , "Email is required"] ,
        unique : true ,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password : {
        type : String ,
        required : true ,
        minlength : 6
    },
    phone_no : {
        type : String ,
        minlength : 10 ,
        required : true ,
        unique : true 
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

