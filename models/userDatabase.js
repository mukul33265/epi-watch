const db = require('../utils/dataBaseUtils') ;

module.exports =  class userData {
    constructor(email,password,phone_no,userName,age,location){
        this.email = email ;
        this.password = password ;
        this.phone_no = phone_no ;
        this.userName = userName ;
        this.age = age ;
        this.location = location ;
    }

    // yet to be done
    save(){
        console.log("your data is stored ") ;
    }
}

