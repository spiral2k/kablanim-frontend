const path = require('path');

// prettier-ignore
module.exports = {
	rootDir: path.join(__dirname, '../../'),
    testMatch: [
        '<rootDir>/src/**/*.test.js'
    ],
    automock: false,
    browser: false,
    bail: false,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**', '!**/build/**', '!**/cypress/**'],
	coverageDirectory: '<rootDir>/coverage',
    globals: {
        __DEV__: true
	},
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    verbose: true,
	setupFilesAfterEnv: ['./config/tests/rtl.setup.js']

};
