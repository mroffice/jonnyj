import puppeteer from 'puppeteer';
import 'dotenv/config'

(async () => {

  const marketplace_id = 2; // amazon.fr
  const asins = ['B07DVBRVQM']; // example single ASIN

  // launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  // navigate to keepa
  await page.goto('https://keepa.com/#!manage');

  // set screen size
  await page.setViewport({width: 1080, height: 1024});

  // your credentials
  const user = process.env.USERNAME;
  const pass = process.env.PASSWORD;

  // wait for page load, click login
  await page.locator('#panelUserRegisterLogin').wait();
  await page.click('#panelUserRegisterLogin');

  // submit login details
  await page.type('input#username', user);
  await page.type('input#password', pass);
  await page.click('#submitLogin');

  // wait for logout button to appear, meaning we're logged in
  await page.locator('#UMElogout').wait();

  // loop over ASINs
  for (let i = 0; i < asins.length; i++) {
    const asin = asins[i];

    // navigate to ASIN
    await page.goto(`https://keepa.com/#!product/${marketplace_id}-${asin}`);

    // click data
    await page.locator('#tabMore').wait();
    await page.click('#tabMore');

    // click offers
    await page.locator('li[data-box="#MoreTab2"]').wait();
    await page.$eval('li[data-box="#MoreTab2"]', (offers) => offers.click());

    // wait for results..
    await page.locator('#grid-offer').wait(); // wait for results

    // click export
    await page.$eval('span.tool__export span.trigger', (exp) => exp.click());
    await page.click('#exportSubmit');
  }

  await browser.close();
})();
