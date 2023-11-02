function requireUser(req, res, next) {
    // no user? go to error middleware instead of fulfilling this request
    if(!req.user) {
      res.status(401).send("You must be logged in to do that!");
    }
    next();
  }
  
  module.exports = {
    requireUser
  }
  