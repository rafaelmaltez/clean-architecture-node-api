const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let userModel

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('UpdateAccessToken Repository', () => {
  let fakeUserId
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })
  beforeEach(async () => {
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 30,
      state: 'any_state',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should update the user with given access token', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUSer = await userModel.findOne({ _id: fakeUserId })
    expect(updatedFakeUSer.accessToken).toBe('valid_token')
  })
  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
