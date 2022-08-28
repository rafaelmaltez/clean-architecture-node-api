const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoURL)
  .then(() => {
    const app = require('./config/app')
    app.listen(3005, () => console.log('Server running!'))
  })
  .catch(console.error)
