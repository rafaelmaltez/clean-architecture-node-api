const MongoHelper = require('./mongo-helper')

describe('MongoHelper', () => {
  test('Should reconnect when getDb is invoked', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getDb()
    expect(sut.db).toBeTruthy()
  })
})
