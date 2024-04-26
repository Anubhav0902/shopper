const mongoose = require("mongoose");

/** UserSchema
 * name  
 * email
 * password
 * cartData
 * date
 * */


const ProductSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    avaibale: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("Product",ProductSchema);  // this will create a collections name "users" and exports it