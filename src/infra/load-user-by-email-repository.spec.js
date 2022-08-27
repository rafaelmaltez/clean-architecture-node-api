const { MongoClient } = require('mongodb')
let client, db
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}
// commit test
describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = client.db()
  })
  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })
  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@email.com')
    expect(user).toBeNull()
  })
  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    userModel.insertOne({ email: 'valid_email@email.com' })
    const user = await sut.load('valid_email@email.com')
    expect(user.email).toBe('valid_email@email.com')
  })
})
