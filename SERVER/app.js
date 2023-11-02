require('dotenv').config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const apiRouter = require('./api')
const jwt =require("jsonwebtoken")



//loggin middleware 
app.use(morgan("dev"));

//Body parsing middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(express.static(path.join(_dirname, '../dist')))

//JWT Authenticate 
// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
 
    try {
      req.user = jwt.verify(token, process.env.JWT);
     
    } catch(e) {
      console.log(e.message)
      if(e.name === "JsonWebTokenError"){

        req.user=null;
      }else {
        next(e);
    }
    }
    next();
  });

//Backend routes
app.use('/api', apiRouter)


module.exports = app;