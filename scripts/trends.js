const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = async () => {

    console.log("Scraping...");

     //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/feed/trending');

    //I get the lastest videos from the DOM
    const result = await page.evaluate(() => {
        window.scrollTo(0,document.documentElement.scrollHeight);

        return Array.from(document.querySelectorAll("#grid-container > ytd-video-renderer")).map((i, position)=>(
            {   date: new Date(),
                position: position,
                title: i.querySelector("#video-title > yt-formatted-string").innerText,
                description: i.querySelector("#description-text").innerText,
                channel: i.querySelector("#text > a").innerText,
                visits: i.querySelector("#metadata-line > span:nth-child(1)").innerText,
                hrefVideo: i.querySelector("#video-title").href,
                hrefChannel: i.querySelector("#text > a").href,
                img: i.querySelector("#img").src
            }
        ));
    });

    //I write the result into the file
    var json = JSON.stringify(result);
    fs.writeFile('./docs/trends.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });

    //I Close the browser
    await browser.close();

    console.log('The youtube Trends are been scraped succesfully. You can check it in the /docs folder the trends.json file.');
};