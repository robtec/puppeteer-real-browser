import { connect } from './index.js'
import * as http from 'http';


while (true) {
    
    const server = http.createServer((req,res)=>{
      //handle requests
    });

    server.listen(process.env.PORT || 3000);
    
    console.log('Start of test.js');
    
    const { page, browser } = await connect({
        headless: 'auto',
        args: [],
        customConfig: {},
        skipTarget: [],
        fingerprint: true,
        turnstile: true,
        connectOption: {},
        tf: true,
    })
    // var cl = setInterval(() => {
    //     page.screenshot({ path: 'example.png' });
    // }, 1000);
    console.log('Connected to browser');
    await page.goto('https://nopecha.com/demo/cloudflare', {
        waitUntil: 'domcontentloaded'
    })
    console.log('Navigated to page');
    await page.waitForSelector('.link_row', {
        timeout: 60000
    })
    // clearInterval(cl)
    await browser.close()
    console.log('End of test.js');
}
