const puppeteer = require('puppeteer');
const fs = require('fs');
const inquirer = require('inquirer');
const clear = require('clear');

module.exports = async (channel) => {
    clear();
    
    console.log("Scraping...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(channel+'/videos');
    
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items")));
    console.log("pasado");
    
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items").querySelectorAll("ytd-grid-video-renderer")));
    console.log("pasado");
    
    await page.waitFor(() => !!(document.querySelector("#contents > ytd-grid-renderer > #items").querySelectorAll("ytd-grid-video-renderer").length > 10));

    console.log("Comprobado");
    
    await page.screenshot({path:'./docs/lastest.png', type:'png',fullPage:true});
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
    var json = JSON.stringify(result);

    fs.writeFile('./docs/lastest.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });

    await browser.close();
    console.log('The lastest videos are been scraped succesfully. You can check it in the docs folder.');

};