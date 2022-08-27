const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
let client, db

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
    const fakeUSer = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 30,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@email.com')
    console.log('fakeUSer', fakeUSer)
    expect(user._id).toStrictEqual(fakeUSer.insertedId)
    expect(user.password).toBe('hashed_password')
    expect(user.email).toBeFalsy()
    expect(user.name).toBeFalsy()
    expect(user.age).toBeFalsy()
    expect(user.state).toBeFalsy()
  })
})
