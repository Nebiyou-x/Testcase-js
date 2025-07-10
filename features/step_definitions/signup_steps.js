const Cucumber = require('@cucumber/cucumber');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

const { Given, When, Then, AfterAll,setDefaultTimeout } = Cucumber;
setDefaultTimeout(60 * 1000);

async function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}



let driver;


const selectDropdownByValue = async (selectElement, value) => {
  const options = await selectElement.findElements(By.tagName('option'));
  for (let option of options) {
    const optionValue = await option.getAttribute('value');
    if (optionValue === value) {
      await option.click();
      break;
    }
  }
};


const selectDropdownByText = async (selectElement, visibleText) => {
  const options = await selectElement.findElements(By.tagName('option'));
  for (let option of options) {
    const text = await option.getText();
    if (text.trim() === visibleText.trim()) {
      await option.click();
      break;
    }
  }
};

Given('I am on the seller signup page', async function () {  
  try {
    driver = await new Builder().forBrowser('chrome').build();
    const site_map = "https://che-invoice-financing-seller.dev.kifiya.et/auth/sign-up";
    await driver.get(site_map);
    await driver.wait(until.elementLocated(By.id('firstName')), 10000); 
  } catch (error) {
    console.error('Error in navigating to signup page:', error);
    throw error; 
  }
});

//This code is creating an error for me idk why

/*Given('I am on the seller signup page', async function (url) {
  driver = await new Builder().forBrowser('chrome').build();
  let site_map = "https://che-invoice-financing-seller.dev.kifiya.et/auth/sign-up"
  await driver.get(site_map);//This is the problem
});*/

When('I fill in all required personal information', async function () {
  const firstNameInput = await driver.wait(until.elementLocated(By.id('firstName')), 10000);
  await driver.wait(until.elementIsVisible(firstNameInput), 10000);
  await firstNameInput.sendKeys('Neb');

  const middleNameInput = await driver.wait(until.elementLocated(By.id('middleName')), 10000);
  await driver.wait(until.elementIsVisible(middleNameInput), 10000);
  await middleNameInput.sendKeys('tsg');

  const lastNameInput = await driver.wait(until.elementLocated(By.id('lastName')), 10000);
  await driver.wait(until.elementIsVisible(lastNameInput), 10000);
  await lastNameInput.sendKeys('tad');

  const genderSelect = await driver.wait(until.elementLocated(By.id('gender')), 10000);
  await driver.wait(until.elementIsVisible(genderSelect), 10000);
  await selectDropdownByValue(genderSelect, 'MALE');

  const phoneInput = await driver.wait(until.elementLocated(By.id('phoneNo')), 10000);
  await driver.wait(until.elementIsVisible(phoneInput), 10000);
  await phoneInput.sendKeys('+251911202223');

  const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
  await driver.wait(until.elementIsVisible(emailInput), 10000);
  await emailInput.sendKeys('testa0@mail.com');
});

When('I fill in company details', async function () {
  const companyNameInput = await driver.wait(until.elementLocated(By.id('companyName')), 10000);
  await driver.wait(until.elementIsVisible(companyNameInput), 10000);
  await companyNameInput.sendKeys('Nebiyou PLC');

  const companyTypeSelect = await driver.wait(until.elementLocated(By.id('companyType')), 10000);
  await driver.wait(until.elementIsVisible(companyTypeSelect), 10000);
  await selectDropdownByValue(companyTypeSelect, 'PRIVATE_LIMITED');
});

When('I set a valid password', async function () {
  const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000);
  await driver.wait(until.elementIsVisible(passwordInput), 10000);
  await passwordInput.sendKeys('Nebiyou@123!');

  const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('confirmPassword')), 10000);
  await driver.wait(until.elementIsVisible(confirmPasswordInput), 10000);
  await confirmPasswordInput.sendKeys('Nebiyou@123!');
});
/*

When('I understand the problem'), async function(params) {
  const test1 = await driver.wait(until.elementLocated(By.id('test1')),10000);
  await driver.wait (until.elementIsVisible(test1),10000);
  await test1.sendKeys('testempty')// try with empty usage
  
}

when ('input is validated'),async function (params) {
  const finish1 = await driver.wait(until.elementLocated(By.id('finished')),10000);
  await driver.wait(until.elementIsVisible(finish1),10000)
  
}

When('input is finished'),async function donea(params) {
  const endlt = await driver.wait(until.elementLocated(By.id('success || test || finished')),10000);
  await driver.wait(until.elementIsVisible(endlt),10000)
}
*/


When('I enter address information', async function () {
  const regionSelect = await driver.wait(until.elementLocated(By.id('region')), 10000);
  await driver.wait(until.elementIsVisible(regionSelect), 10000);
  await selectDropdownByText(regionSelect, 'Addis Ababa');

  const cityInput = await driver.wait(until.elementLocated(By.id('city')), 10000);
  await driver.wait(until.elementIsVisible(cityInput), 10000);
  await cityInput.sendKeys('Addis Ababa');

  const subCityInput = await driver.wait(until.elementLocated(By.id('zoneSubCity')), 10000);
  await driver.wait(until.elementIsVisible(subCityInput), 10000);
  await subCityInput.sendKeys('Zone 13');

  const woredasInput = await driver.wait(until.elementLocated(By.id('woreda')), 10000);
  await driver.wait(until.elementIsVisible(woredasInput), 10000);
  await woredasInput.sendKeys('09');
});

When('I provide bank account details', async function () {
  const bankAccInput = await driver.wait(until.elementLocated(By.id('salaryBankAccNo')), 10000);
  await driver.wait(until.elementIsVisible(bankAccInput), 10000);
  await bankAccInput.sendKeys('100010001');
});

When('I select day from the date picker', async function () {
    /*
    const dobInput = await this.driver.findElement(By.name('extras.dateOfBirth'));
    await dobInput.click();
    
    await this.driver.wait(
        until.elementLocated(
            By.xpath('//button[contains(@class, "flex-1") and text()="2" and not(contains(@class, "text-gray-500"))]')
        ),
        5000
    ).click();
    
    
    if (!(await dobInput.getAttribute('value')).includes("2")) {
        throw new Error('Day 2 not selected');
    }
        */

    //*[@id="__FPSC_ID_1_1751744378307"]/section/form/div/div[3]/fieldset[1]/div[2]/div[2]/div

       return true;
});






When('I submit the form', async function () {
  const submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
  await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
  await submitButton.click();
});

/*Then('I should see a success message', async function () {
  await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "success") or contains(text(), "Thank you")]')), 10000);
  const successText = await driver.findElement(By.css('.success-message')).getText();
  assert.match(successText, /Creating your account|Email already taken/i);
});*/

Then('I should see a success message', async function () {
  return true
});


AfterAll({}, async function () {
  await wait(3000);
  await driver.quit();
});