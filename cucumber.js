module.exports = {
  default: {
    format: ['@cucumber/pretty-formatter'],
    require: [
      'features/step_definitions/*.js',
      'support/hooks.js'
    ],
    timeout: 30000
  }
};