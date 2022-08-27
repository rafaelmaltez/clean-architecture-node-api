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
    this.client = null
    this.db = null
  },
  async getDb () {
    if (!this.client || !this.db) {
      await this.connect(process.env.MONGO_URL, this.dbName)
    }
    return this.db
  }
}
