module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/src/**/*.js', '!**src/main/**'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig']
}
