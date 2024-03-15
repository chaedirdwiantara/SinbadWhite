module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['import'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'comma-dangle': 'off'
  }
};
