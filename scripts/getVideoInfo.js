const puppeteer = require('puppeteer');
const fs = require('fs');
const clear = require('clear');

module.exports = async (video) => {

    clear();
    console.log("Scraping...");

    //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(video);
    
    //I look forward to loading the important items
    await page.waitFor(() => !!(document.querySelector("#container > h1 > yt-formatted-string")));    
  
    //I get the lastest videos from the DOM
    const result = await page.evaluate(()=>{

      return {
        title: document.querySelector("#container > h1 > yt-formatted-string").innerText,
        visits: document.querySelector("#count > yt-view-count-renderer > span.view-count.style-scope.yt-view-count-renderer").innerText,
        description: document.querySelector("#description.ytd-video-secondary-info-renderer").innerText,
        publicationDate: document.querySelector("#date > yt-formatted-string").innerText,
        likes: document.querySelectorAll("#text.ytd-toggle-button-renderer")[0].innerText,
        dislikes: document.querySelectorAll("#text.ytd-toggle-button-renderer")[1].innerText
      }
    });

   const related = await page.evaluate(()=>(Array.from(document.querySelectorAll("#related #items .ytd-watch-next-secondary-results-renderer")).map((i, position)=>(
            {
              position,
              title: i.querySelector("#video-title").innerText, 
              channel: i.querySelector("#channel-name").innerText, 
              href: i.querySelector("#thumbnail").href
            }
            ))
        )
    );

    result.related = related;
    
    //I write the result into the file
    var json = JSON.stringify(result);
    fs.writeFile('./docs/videoInfo.json',json,'utf8', function (error) {
        if(error) return console.error(error);
    });
    
    //I Close the browsers
    await browser.close();
    
    console.log('The video info is been scraped succesfully. You can check it in the /docs folder the videoInfo.json file.');

};