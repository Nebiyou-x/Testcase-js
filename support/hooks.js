require('../features/step_definitions/signup_steps');
const { AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { driver } = require('../features/step_definitions/signup_steps');

BeforeAll(async function () {
  console.log('Starting test session...');
});

AfterAll(async function () {
  await driver.quit();
  console.log('Browser closed.');
});