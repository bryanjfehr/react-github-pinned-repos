module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/tests/**/*.test.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '\\.module\\.css$': '<rootDir>/tests/__mocks__/styleMock.js', // CSS modules
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Plain CSS (e.g., Bootstrap)
    },
  };