const puppeteer = require('puppeteer');
const fs = require('fs');
const inquirer = require('inquirer');
const clear = require('clear');
const { title } = require('process');

module.exports = async () => {
    clear();
    
    const {name} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the name of the channel"
      }
    ]);
    console.log("Scraping...");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query='+name);

    const quantity = await page.evaluate(()=>(Array.from(document.querySelectorAll("#content-section")).length));
    clear();
    console.log("We found "+quantity+" options");
    
    const options = await page.evaluate(()=>(Array.from(document.querySelectorAll("#content-section")).map(i=>(
        {
            title: i.querySelector("#text").innerText,
            href: i.querySelector("#main-link").href
        }
    ))));
    
    const choices = options.map(i=>(i.title));

    clear();
    const {selection} = await inquirer.prompt([{
      type: 'list',
      name: 'selection',
      message: 'Select the searched channel that you want',
      choices: choices
    }]);

    var found= options.find(element => element.title == selection);
       
    await browser.close();

    return found.href;
};