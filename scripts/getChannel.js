const puppeteer = require('puppeteer');
const fs = require('fs');
const inquirer = require('inquirer');
const clear = require('clear');
const { title } = require('process');

module.exports = async () => {

    clear();
         
    //I create a new menu in order to catch the name of the channel
    const {name} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the name of the channel"
      }
    ]);

    console.log("Scraping...");

    //I open the browser and surf to the URL
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query='+name);
    

    //Get the quantity and display it.
    const quantity = await page.evaluate(()=>(Array.from(document.querySelectorAll("#content-section")).length));
    clear(); console.log("We found "+quantity+" options");
    
    //I get the channel options from the DOM
    const options = await page.evaluate(()=>(Array.from(document.querySelectorAll("#content-section")).map(i=>(
        {
            title: i.querySelector("#text").innerText,
            href: i.querySelector("#main-link").href
        }
    ))));
    
    //I Close the browser
    await browser.close();

    //I create a new menu in order to select the wanted channel
    const choices = options.map(i=>(i.title));
    const {selection} = await inquirer.prompt([{
      type: 'list',
      name: 'selection',
      message: 'Select the searched channel that you want',
      choices: choices
    }]);

    //Find channel in the array in order to return the href
    var found= options.find(element => element.title == selection);
    return found.href;
};