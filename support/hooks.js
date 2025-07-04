const { setWorldConstructor } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class CustomWorld {
  constructor() {
    this.driver = null;
  }

  async initDriver() {
    const options = new chrome.Options();
    options.addArguments('--headless'); 
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    return this.driver;
  }
}

setWorldConstructor(CustomWorld);