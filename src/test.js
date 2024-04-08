const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); })

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.get('/', async (req, res) => {
    try {
        
        var url = 'https://nopecha.com/demo/cloudflare'
        
        const { connect } = await import('puppeteer-real-browser');
        const { browser, page } = await connect({
            headless: 'auto',
            args: [],
            customConfig: {},
            skipTarget: [],
            fingerprint: true,
            turnstile: true,
            connectOption: {},
            tf: true,
        });
        
        console.log('Connected to browser');
        
        await page.goto(url, {
            waitUntil: 'domcontentloaded'
        })
        
        console.log('Navigated to page');
        
        await page.waitForSelector('.link_row', {
            timeout: 60000
        })
        
        await sleep(5000);
        const data = await page.content();
        await browser.close();
        res.send(data);
        
    } catch (err) {
        res.send(err.message)
    }
});
