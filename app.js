const express = require('express')
const productrouter = require('./src/routes/Authroute')
const cors = require('cors')
const passport=require("passport");
require("./src/config/passport")
const session = require('express-session');
const app = express()

require("dotenv").config()
// Set up session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));
  


// const customerroutes = require('./src/routes/UserRoutes')
app.use(cors())

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/image",express.static(__dirname+"/public/image"))

app.use("/auth",productrouter)
app.use("/adminLogin",productrouter)
// app.use("/api",customerroutes)



module.exports = app;