const mongoose = require("mongoose");

/** UserSchema
 * name  
 * email
 * password
 * cartData
 * date
 * */

const userSchema = mongoose.Schema({
    username: {
        type:String
    },
    email:{
        type: String,
        unqiue: true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("User",userSchema);  // this will create a collections name "users" and exports it