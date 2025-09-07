const mongoose = require('mongoose') ;

// module.exports =  class userData {
//     constructor(email,password,phone_no,userName,age,location){
//         this.email = email ;
//         this.password = password ;
//         this.phone_no = phone_no ;
//         this.userName = userName ;
//         this.age = age ;
//         this.location = location ;
//     }
// }

const userSchema = mongoose.Schema({
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
    phone_no: {  // 
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    userName : {
        type : String ,
        required : true ,
    },
    age : {
        type : Number ,
        required : true ,
    },
    location : {
        type : String ,
        required : true ,
    }
})

module.exports = mongoose.model('User',userSchema) ;