/**
 * I need to write the controller/logic to register a user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken");


/** UserSchema
 * name  
 * email
 * password
 * cartData
 * date
 * */

async function signup(req,res){
    /**
    * Logic to create the user
    */

    //1. read the request body
    const request_body = req.body; // it returns the request body in the form JSON

    if(request_body.username === '') {
        return res.status(404).send({
            success:false,
            errors: "Username Required"
        })
    }
    if(request_body.email === ''){
        return res.status(404).send({
            success:false,
            errors: "Email is Required"
        })
    }
    if(request_body.password === ''){
        return res.status(404).send({
            success:false,
            errors:"Password is Required"
        })
    }


    let check = await user_model.findOne({email:request_body.email});
    if(check){
        return res.status(400).json({
            success: false,
            errors: "exitising user found with same email address"
        })
    }

    let cart = {};
    for(let i=0 ; i<300 ; i++){
        cart[i] = 0;
    }

    //2. insert the data in the users collections in mongoDB
    const userObj = {
        username: request_body.username,
        email: request_body.email,
        password: bcrypt.hashSync(request_body.password,8),
        cartData: cart,
    }

    try{
        const user_created = await user_model.create(userObj);
        console.log("user Created Successfully");
        /**
         * return this user
        */
        const res_obj = {
            username: user_created.username,
            email: user_created.email,
        }
        res.status(201).send({
            success: true,
            user: res_obj
        }); // 201 status indicate the successfully created
    }
    catch(err){
        console.log("Error: while registring the user");
        res.status(500).send({
            success: false,
            errors: "Some error happend while registring the user"
        })  // internal server error
    }

    //3.return the response back to the user
}



async function signin(req,res){
    //check if the user id is present in the system or not
    console.log(req.body);
    const user = await user_model.findOne({email : req.body.email});
    
    if(user === null){
        console.log("User not found!!!")
        return res.status(400).json({
            success:false,
            errors:"Invalid email passed!!"
        })
    }
    
    if(req.body.email === ''){
        console.log("Email is Required!!")
        return res.status(400).json({
            success:false,
            errors:"Email is Required!!"
        })
    }

    // check password is given by the user or not 
    const check = req.body.password;
    if(check === '' || check === null){
        console.log("Password is Required!!")
        return res.status(400).json({
            success:false,
            errors:"Password is Required!!"
        })
    }

    //password is correct or not 
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
    if(!isPasswordValid){
        console.log("Invalid password passed!!")
        return res.status(400).json({
            success:false,
            errors:"Invalid password passed!!"
        })
    }

    const data = {
        user: {
            id: user.id
        }
    }

    //using JWT we will create the access token with TTL (time to live) and return 
    const token = jwt.sign(data, 'secret_shopper_ecom');   // parameter -> payload (token create on which field) , secret_ket for unqiueness, time to live 

    return res.status(200).json({
        success:true,
        username: user.username,
        email: user.email,
        accessToken: token
    })
}



module.exports = {
    signup: signup,
    signin : signin
}