module.exports = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
