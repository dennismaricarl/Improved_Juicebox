const express = require("express")
const apiRouter = express.Router()

apiRouter.use('/posts', require('./posts'))
apiRouter.use('/tags', require('./tags'))
apiRouter.use('/users', require('./users'))

module.exports = apiRouter 