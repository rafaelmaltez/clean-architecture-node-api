const loginRouter = require('../composers/login-router.composer')

const ExpressRouterAdapter = require('../adapter/express-router-adapter')

module.exports = router => {
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}
