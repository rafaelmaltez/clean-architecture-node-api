const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors')
let userModel

const makeSut = () => {
  return new LoadUserByEmailRepository()
}
// commit test
describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })
  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@email.com')
    expect(user).toBeNull()
  })
  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUSer = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 30,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@email.com')
    expect(user._id).toStrictEqual(fakeUSer.insertedId)
    expect(user.password).toBe('hashed_password')
    expect(user.email).toBeFalsy()
    expect(user.name).toBeFalsy()
    expect(user.age).toBeFalsy()
    expect(user.state).toBeFalsy()
  })
  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
