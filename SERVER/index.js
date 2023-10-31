const app = require('./app');

const { listen } = require("vite-express");

listen(app, 3000, () => 
console.log("Server is listening on port 3000..."))

