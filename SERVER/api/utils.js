function requireUser(req, res, next) {
    // no user? go to error middleware instead of fulfilling this request
    if(!req.user) {
      res.status(401);
      next({
        name: 'MissingUserError',
        message: "You must be logged in to perform this action"
      })
    }
  }
  
  module.exports = {
    requireUser
  }
  