const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const Product = require("./models/product.model.js")
const Users = require("./models/user.model.js");
require('dotenv').config();

const port =  5000;

app.use(express.json());
// Allow requests from specific origins
const allowedOrigins = ['https://shopper-seven-flame.vercel.app', 'https://shopper-y4ja.onrender.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


// Database connection with mongoDB
/** MongoDB setUp */
const MongoDB_URL = process.env.MONGODB_URL;
mongoose.connect(MongoDB_URL);

const db = mongoose.connection;

db.on("error", (err)=>{
    console.log("ERROR: DB is not connected correctly")
})

db.on("disconnected", ()=>{
    console.log("DB is disconnected successfully!!!");    
})

db.on("connected", ()=>{
    console.log("DB is connected successfully!!!");
})




// API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})



// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});


// creating upload endpoint for images
app.use('/images',express.static('upload/images'));

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `https://shopper-y4ja.onrender.com/images/${req.file.filename}`
    })
})



// here we creating endpoints for product data

app.post("/addproduct", async (req,res)=> {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }

    const data = req.body;

    const product = new Product({
        id: id,
        name: data.name,
        image: data.image,
        category: data.category,
        new_price: data.new_price,
        old_price: data.old_price,
    });

    console.log(product);
    await product.save();

    console.log("product saved successfully");

    res.json({
        success:1,
        name: data.name
    })
})




// creating Api for removing products

app.post("/removeproduct", async(req,res) => {
    const removeProduct = await Product.findOneAndDelete({id:req.body.id});
    if(removeProduct == null){
        return res.send({
            message:"Product not found"
        })
    }
    console.log("Product removed successfully");
    res.json({
        success:1,
        name: req.body.name
    })
})



// creating API for getting All Products
app.get("/allproducts", async(req,res)=>{
    let products = await Product.find({});
    if(products.length === 0){
        return res.send({
            message: "Empty"
        })
    }
    
    console.log("products data fetched successfully")
    return res.send(products);
})




// creating endpoint for newcollection data
app.get('/newcollections',async(req,res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched succesfully")
    res.send(newcollection);
})



// creating for popular in women section
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category: "women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})


// creating middleware to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({
            errors: "Please authenticate using valid token"
        })
    }
    else{
        try {
            const data = jwt.verify(token,'secret_shopper_ecom');
            req.user = data.user;
            next();

        } catch (err) {
            res.status(401).send({
                errors: "Please authenticate using valid token"
            })
        }
    }
}


// creating endpoint for adding products in cartData
app.post('/addtocart', fetchUser, async(req,res) => {
    console.log("removed product successfully ",req.body, req.user);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData});
    res.send("Added")
})


// create enpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req,res) => {
    console.log("removed product successfully ",req.body.itemId, req.user);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData});
    res.send("Removed")
})




// creating endpoint to get cartData
app.post('/getcart',fetchUser, async(req,res) => {
    console.log("getCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


/**
 * Stich the route to the server
*/
const authRoutes = require("./routes/auth.routes.js"); // calling routes
authRoutes(app); // passing app object




app.listen(port,(err)=>{
    if(err) console.log("error while running server");
    else console.log("server started at port ",port);
})