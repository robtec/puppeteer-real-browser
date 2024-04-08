const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); })

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.get('/:url', async (req, res) => {
    try {
        var url = req.params.url;
        
        url = 'https://nopecha.com/demo/cloudflare'
        
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
        
        await page.goto(url, {
            timeout: 0,
        });
        
        await sleep(5000);
        const data = await page.content();
        await browser.close();
        res.send(data);
        
    } catch (err) {
        res.send(err.message)
    }
});
