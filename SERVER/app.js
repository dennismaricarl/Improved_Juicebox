const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();


//logging middleware 
app.use(morgan("dev"));

//Body parsing middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(express.static(path.join(_dirname, '../../dist')))

module.exports = app; 