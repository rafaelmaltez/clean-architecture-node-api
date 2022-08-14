module.exports = class serverError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'ServerError'
  }
}
