const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  },
  async disconnect () {
    await this.client.close()
  },
  async getDb () {
    return this.db
  }
}
