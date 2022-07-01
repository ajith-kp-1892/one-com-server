module.exports = {
  preset             : 'ts-jest',
  testEnvironment    : 'node',
  testMatch          : ['**/*.spec.ts'],
  testEnvironment    : './jest-configs/jest_environment_setup.js',
  setupFilesAfterEnv : ["./jest-configs/jest-defaultTimeout.js"],
  collectCoverage    : true,
  coverageDirectory  : "coverage",
  coverageReporters  : ["lcov", "text", "clover"],
  collectCoverageFrom: [
    //Folders not need to be included in coverage
    "**/*.ts",
    "**/src/**",
    "!**/build/**",
    "!**/node_modules/**"
  ]
}