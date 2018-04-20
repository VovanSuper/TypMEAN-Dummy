module.exports = {
  bail: true,
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  roots: [
    "<rootDir>/Server/"
  ],
  testEnvironment: "node",
  testRegex: "(__test__/.*|(\\.|/)(spec|e2e-test))\\.(ts|js)$",
  // setupTestFrameworkScriptFile: "jest-extended",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ]
}