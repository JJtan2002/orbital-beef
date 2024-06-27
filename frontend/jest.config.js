const path = require('path');

module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [path.resolve(__dirname, 'src/setupTests.js')],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": path.resolve(__dirname, 'src/__mocks__/fileMock.js'),
    },
};