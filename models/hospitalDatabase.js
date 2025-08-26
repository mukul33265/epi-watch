const db = require('../utils/dataBaseUtils') ;

module.export =  class hospitalData {
    constructor(email,password,phone_no,name,location,){
        this.email = email ;
        this.password = password ;
        this.phone_no = phone_no ;
        this.name = name ;
        this.location = location ;
    }


}
