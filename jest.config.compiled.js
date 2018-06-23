module.exports = {
  bail: true,
  verbose: true,
  resetModules: true,
  roots: ['<rootDir>/dist/out-test-tsc'],
  rootDir: __dirname,
  resetModules: true,
  noStackTrace: true,
  testEnvironment: 'node',
  testRegex: '(__test__/.*|(\\.|/)(spec|e2e-test))\\.js$',
  // setupTestFrameworkScriptFile: "./node_modules/jest-extended",
  moduleFileExtensions: ['js', 'json'],
};
