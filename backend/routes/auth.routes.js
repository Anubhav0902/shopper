/**
 * POST call on localhost:4000/Shopper/auth/signin
 * 
 * I need to intercept this
 */
const authController = require("../controller/auth.controller.js")


function setupAuthRoute(app) {
   app.post("/Shopper/auth/signup",authController.signup);

   app.post("/Shopper/auth/signin", authController.signin);
}

module.exports = setupAuthRoute;