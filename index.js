const puppeteer = require('puppeteer');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};
  

(async () => {

    while (1){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://crypto.com/defi/dashboard/gas-fees');
    
        let current = {}
        let now = dayjs()
        current.time = now.unix()
        
        let target = await page.$x(`//*[@id="__next"]/div/div/div/div/main/div[2]/div[2]/div[1]/div/table/tbody/tr[6]/td[7]`)
    
        current.price = await page.evaluate(el => el.textContent, target[0])

        var file_path = path.join(__dirname, 'data.txt'); 

        if (fs.existsSync(file_path)){
            var data_pre = JSON.parse(fs.readFileSync(file_path))
            data_pre.push(current)
            fs.unlinkSync(file_path)
        }else{
            var data_pre = [current]
        }
        console.log(current)
        fs.writeFileSync(file_path, JSON.stringify(data_pre))

        await browser.close();
        await sleep(60000);
        // await sleep(6000);
    }

})();