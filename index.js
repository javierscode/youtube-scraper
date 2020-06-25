const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

const trends = require('./scripts/trends');
const lastest = require('./scripts/lastest');
const getChannel = require('./scripts/getChannel');
const getChannelInfo = require('./scripts/getChannelInfo');
const getVideo = require('./scripts/getVideo');
const getVideoInfo = require('./scripts/getVideoInfo');



function  app() {

  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('Youtube  Scraper', { horizontalLayout: 'full' })
    )
  );

  inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        new inquirer.Separator(),
        'Get Youtube Trends',
        'Get Channel information',
        'Get the latest videos from a Youtube channel',
        'Get Video information',
        'Exit'
      ]
    }
  ])
  .then(async answers => {
        const {action} = answers;
        
        switch (action) {
            case 'Get Youtube Trends':
                await trends();
                setTimeout(app, 4000);
                break;
            case 'Get Channel information':
                var url= await getChannel();
                await getChannelInfo(url)
                setTimeout(app, 4000);
                break;
            case 'Get the latest videos from a Youtube channel':
                var url= await getChannel();
                await lastest(url);
                setTimeout(app, 4000);
                break;
            case 'Get Video information':
                var url= await getVideo();
                await getVideoInfo(url);
                break;
            default:
              process.exit();
                break;
        }
  });
};

app();
  
  
  
