const puppeteer = require('puppeteer');
const inquirer = require('inquirer');
const clear = require('clear');

module.exports = async () => {

    clear();
         
    //I create a new menu in order to catch the name of the channel
    const {name} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the name of the video"
      }
    ]);

    console.log("Scraping...");

    //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query='+name);
    

    //Get the quantity and display it.
    const quantity = await page.evaluate(()=>(Array.from(document.querySelectorAll("#dismissable.ytd-video-renderer")).length));
    clear(); console.log("We found "+quantity+" options");
    

    //I get the channel options from the DOM
    const options = await page.evaluate(()=>(Array.from(document.querySelectorAll("#dismissable.ytd-video-renderer")).map(i=>(
        {
            title: i.querySelector("#video-title").innerText,
            channel: i.querySelector("#channel-name #text").innerText,
            href: i.querySelector("#video-title").href
        }
    ))));
    
    //I Close the browser
    await browser.close();

    //I create a new menu in order to select the wanted channel
    const choices = options.map(i=>(i.title+' |<->| '+i.channel));
    const {selection} = await inquirer.prompt([{
      type: 'list',
      name: 'selection',
      message: 'Select the searched video that you want',
      choices: choices
    }]);

    //Find channel in the array in order to return the href
    const found= options.find(i => i.title+' |<->| '+i.channel == selection);
    return found.href;
};