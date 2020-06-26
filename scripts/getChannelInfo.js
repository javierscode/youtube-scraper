const puppeteer = require('puppeteer');
const fs = require('fs');
const clear = require('clear');

module.exports = async (channel) => {

    clear();
    console.log("Scraping...");

    //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(channel+'/about');
    
    //I look forward to loading the important items
    await page.waitFor(() => !!(document.querySelector("#description-container")));    
  
    //I get the lastest videos from the DOM
    const result = await page.evaluate(()=>{

      return {
        title: document.querySelector("#channel-header-container #text").innerText,
        subscribers: document.querySelector("#channel-header-container #subscriber-count").innerText,
        description: document.querySelector("#description-container").querySelector("#description").innerText,
        creationDate: document.querySelector("#right-column > yt-formatted-string:nth-child(2) > span:nth-child(2)").innerText,
        visits: document.querySelector("#right-column > yt-formatted-string:nth-child(3)").innerText
      }
    });

    const links = await page.evaluate(()=>(Array.from(document.querySelectorAll("#left-column #link-list-container a")).map(i=>(
            {
              name: i.innerText, 
              href: i.href
            }
            ))
        )
    );
    result.links = links;
    
    //I write the result into the file
    var json = JSON.stringify(result);
    fs.writeFile('./docs/channelInfo.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });
    
    //I Close the browsers
    await browser.close();
    
    console.log('The channel info is been scraped succesfully. You can check it in the /docs folder the channelInfo.json file.');

};