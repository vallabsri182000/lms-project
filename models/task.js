const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({

    myInput : {
        type:String,
        required:true
    },

    date : {
        type:Number,
        required:true
    }

})

//Create collection 

const task = mongoose.model("task",taskSchema);

module.exports = task;