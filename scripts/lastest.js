const puppeteer = require('puppeteer');
const fs = require('fs');
const clear = require('clear');

module.exports = async (channel) => {

    clear();
    console.log("Scraping...");

    //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(channel+'/videos');
    
    //I look forward to loading the important items
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items")));    
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items").querySelectorAll("ytd-grid-video-renderer")));
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items").querySelectorAll("ytd-grid-video-renderer").length > 10));

    //I get the lastest videos from the DOM
    const result = await page.evaluate(()=>{

      return Array.from(document.querySelector("#contents > ytd-grid-renderer > #items").querySelectorAll("ytd-grid-video-renderer")).slice(0,10).map((i, position)=>(
        {
          position: position,
          title: i.querySelector("#video-title").innerText,
          visits: i.querySelector("#metadata-line > span:nth-child(1)").innerText,
          hoursAgo: i.querySelector("#metadata-line > span:nth-child(2)").innerText,
          duration: i.querySelector("#overlays > ytd-thumbnail-overlay-time-status-renderer > span").innerText,
          img: i.querySelector("#img").src
        }
      ));
    });

    //I write the result into the file
    var json = JSON.stringify(result);
    fs.writeFile('./docs/lastest.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });
    
    //I Close the browser
    await browser.close();
    
    console.log('The lastest videos are been scraped succesfully. You can check it in the docs folder.');

};