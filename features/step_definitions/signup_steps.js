const { Given, When, Then, After } = require('@cucumber/cucumber');
const { By, until, Select } = require('selenium-webdriver');
const assert = require('assert');

Given('I am on the seller signup page', { timeout: 30000 }, async function () {
  await this.initDriver();
  await this.driver.get('https://che-invoice-financing-seller.dev.kifiya.et/auth/sign-up');
  await this.driver.wait(until.elementLocated(By.id('firstName')), 15000);
});

 



/*
Given('I am on the seller signup page', async function (url) {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(url);
});
*/
When('I fill in all required personal information', async function () {
  const firstNameInput = await driver.wait(until.elementLocated(By.id('firstName')), 10000, 'firstName input not found');
  await driver.wait(until.elementIsVisible(firstNameInput), 10000, 'firstName input not visible');
  await firstNameInput.sendKeys('Nebiyou');

  const middleNameInput = await driver.wait(until.elementLocated(By.id('middleName')), 10000, 'middleName input not found');
  await driver.wait(until.elementIsVisible(middleNameInput), 10000, 'middleName input not visible');
  await middleNameInput.sendKeys('tsg');

  const lastNameInput = await driver.wait(until.elementLocated(By.id('lastName')), 10000, 'lastName input not found');
  await driver.wait(until.elementIsVisible(lastNameInput), 10000, 'lastName input not visible');
  await lastNameInput.sendKeys('tad');

  const genderSelect = await driver.wait(until.elementLocated(By.id('gender')), 10000, 'gender select not found');
  await driver.wait(until.elementIsVisible(genderSelect), 10000, 'gender select not visible');
  const gender = new Select(genderSelect);
  await gender.selectByValue('MALE');

  const phoneInput = await driver.wait(until.elementLocated(By.id('phoneNo')), 10000, 'phoneNo input not found');
  await driver.wait(until.elementIsVisible(phoneInput), 10000, 'phoneNo input not visible');
  await phoneInput.sendKeys('+251911202223');

  const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000, 'email input not found');
  await driver.wait(until.elementIsVisible(emailInput), 10000, 'email input not visible');
  await emailInput.sendKeys('Nebiyou@mail.com');
});


When('I fill in company details', async function () {
  const companyNameInput = await driver.wait(until.elementLocated(By.id('companyName')), 10000, 'companyName input not found');
  await driver.wait(until.elementIsVisible(companyNameInput), 10000, 'companyName input not visible');
  await companyNameInput.sendKeys('Nebiyou PLC');

  const companyTypeSelect = await driver.wait(until.elementLocated(By.id('companyType')), 10000, 'companyType select not found');
  await driver.wait(until.elementIsVisible(companyTypeSelect), 10000, 'companyType select not visible');
  const companyType = new Select(companyTypeSelect);
  await companyType.selectByValue('PRIVATE_LIMITED');
});


When('I set a valid password', async function () {
  const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000, 'password input not found');
  await driver.wait(until.elementIsVisible(passwordInput), 10000, 'password input not visible');
  await passwordInput.sendKeys('Nebiyou@123!');

  const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('confirmPassword')), 10000, 'confirmPassword input not found');
  await driver.wait(until.elementIsVisible(confirmPasswordInput), 10000, 'confirmPassword input not visible');
  await confirmPasswordInput.sendKeys('Nebiyou@123!');
});


When('I enter address information', async function () {
  const regionSelect = await driver.wait(until.elementLocated(By.id('region')), 10000, 'region select not found');
  await driver.wait(until.elementIsVisible(regionSelect), 10000, 'region select not visible');
  const region = new Select(regionSelect);
  await region.selectByVisibleText('Addis Ababa');

  const cityInput = await driver.wait(until.elementLocated(By.id('City')), 10000, 'City input not found');
  await driver.wait(until.elementIsVisible(cityInput), 10000, 'City input not visible');
  await cityInput.sendKeys('Addis Ababa');

  const subCityInput = await driver.wait(until.elementLocated(By.id('subCity')), 10000, 'subCity input not found');
  await driver.wait(until.elementIsVisible(subCityInput), 10000, 'subCity input not visible');
  await subCityInput.sendKeys('Zone 13');

  const woredasInput = await driver.wait(until.elementLocated(By.id('Woredas')), 10000, 'Woredas input not found');
  await driver.wait(until.elementIsVisible(woredasInput), 10000, 'Woredas input not visible');
  await woredasInput.sendKeys('09');
});


When('I provide bank account details', async function () {
  const bankAccInput = await driver.wait(until.elementLocated(By.id('salaryBankAccNo')), 10000, 'salaryBankAccNo input not found');
  await driver.wait(until.elementIsVisible(bankAccInput), 10000, 'salaryBankAccNo input not visible');
  await bankAccInput.sendKeys('100010001');
});


When('I select my date of birth as {string}', async function (dateString) {
  
  const date = new Date(dateString);
  const targetMonth = date.toLocaleString('default', { month: 'long' });
  const targetYear = date.getFullYear();
  const targetDay = date.getDate();

  const dobField = await driver.findElement(By.name('extras.dateOfBirth'));
  await dobField.click();

  
  let monthYear = await driver.findElement(By.css('[class*="flex items-center justify-center"]')).getText();
  
  while (!monthYear.includes(targetMonth) || !monthYear.includes(targetYear.toString())) {
    await driver.findElement(By.css('[aria-label="Next Month"]')).click();
    monthYear = await driver.findElement(By.css('[class*="flex items-center justify-center"]')).getText();
  }


  await driver.findElement(By.xpath(`//button[text()="${targetDay}"]`)).click();
});


When('I submit the form', async function () {
  const submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
  await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
  await submitButton.click();
});


Then('I should see a success message', async function () {
  await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "success") or contains(text(), "Thank you")]')), 10000);
  const successText = await driver.findElement(By.css('.success-message')).getText();
  assert.match(successText, /success|thank you/i);
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});

