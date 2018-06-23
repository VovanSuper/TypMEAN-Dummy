module.exports = {
  bail: true,
  verbose: true,
  resetModules: true,
  noStackTrace: true,
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  roots: [
    "<rootDir>/Server/"
  ],
  testEnvironment: "node",
  testRegex: "(__test__/.*|(\\.|/)(spec|e2e-test))\\.(ts|js)$",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ]
}