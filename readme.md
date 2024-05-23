1. Open Terminal and run `npm install`
2. Rename `.env.sample` to `.env` and fill in your credentials.
3. Run the script `node index.js`

+ The example is an ASIN from Amazon.fr - if you look at your the URL when viewing an ASIN on Keepa you should see the `marketplace_id` just before the ASIN. So in this example the full URL will build as `https://keepa.com/#!product/2-B07DVBRVQM` - 2 being the French `marketplace_id`.
+ The script will run and open a minimal browser so you can see what's going on, this is because we have passed `{ headless: false, slowMo: 50 }` options to puppeteer. Once confirmed is working, you can remove these options.
+ Should deliver download straight to your `~/Downloads` folder by default - haven't tried in headless mode