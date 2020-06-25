const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = async () => {
    console.log("Scraping...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/feed/trending');
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

    var json = JSON.stringify(result);

    fs.writeFile('./docs/trends.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });

    await browser.close();

    console.log('The youtube Trends are been scraped succesfully. You can check it in the docs folder.');
};