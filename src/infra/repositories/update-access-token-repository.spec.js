const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })
  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should update the user with given access token', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
    const fakeUSer = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 30,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUSer.insertedId, 'valid_token')
    const updatedFakeUSer = await userModel.findOne({ _id: fakeUSer.insertedId })
    expect(updatedFakeUSer.accessToken).toBe('valid_token')
  })
  test('Should throw id no userModel is provided', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository()
    const fakeUSer = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 30,
      state: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(fakeUSer.insertedId, 'valid_token')
    expect(promise).rejects.toThrow()
  })
})
