const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

BeforeAll(async function () {
  const options = new chrome.Options()
    .addArguments('--headless')
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage');

  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    
  this.driver = driver;
});

AfterAll(async function () {
  if (driver) {
    await driver.quit();
  }
});

module.exports = { driver };