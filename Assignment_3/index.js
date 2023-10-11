const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--start-maximized'); 

const driver = new selenium.Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

const websiteUrl = 'https://practice.expandtesting.com/login';
const username = 'practice';
const password = 'SuperSecretPassword!';

async function automateLogin() {
    try {
        await driver.get(websiteUrl);

        const usernameField = await driver.findElement(selenium.By.id('username'));
        const passwordField = await driver.findElement(selenium.By.id('password'));
        const loginButton = await driver.findElement(selenium.By.css('button[type="submit"]'));
        
        await usernameField.sendKeys(username);
        await passwordField.sendKeys(password);
        await loginButton.click();
        await driver.findElement(selenium.By.xpath('/html/body/main/div[2]/div/a')).click();
        await driver.wait(selenium.until.elementLocated(selenium.By.id('flash')), 10000); 
        await delay(5000);
        console.log('User Logged In and Logged Out Successfully Using Selenium Testing.');
    } catch (error) {
        console.error('Error while testing using selenium:', error);
    } finally {
        await driver.quit();
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function call to run the automation
automateLogin();