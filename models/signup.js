const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    fname : {
        type:String,
        required:true
    },
    lname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    cnum : {
        type:Number,
        required:true,
        unique:true
    },
    psw : {
        type:String,
        required:true
    },

    cpsw : {
        type:String,
        required:true
       
    },

   img : {
       data:Buffer,
    contentType:String
    }

})

// Now We need to create a collections

const signup =  mongoose.model("signup",userSchema);

module.exports = signup;