# Youtube-Scraper
This project is a YouTube Scraper with the goal of testing the puppeteer library.

The application allows:
- Get current Youtube Trends.
- Get specific channel information.
- Get the lastest videos from a Youtube channel.
- Get information from a specific video.

## Built with 🛠️

* [NodeJS](https://nodejs.org/) - JavaScript runtime environment .
* [puppeteer](https://github.com/puppeteer/puppeteer) - NodeJS library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. 
* [fs](https://www.npmjs.com/package/file-system) - This module make file opertaion apis simple.
* [inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.
* [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right.
* [clear](https://www.npmjs.com/package/clear) - Clear the terminal screen if possible.
* [figlet](https://www.npmjs.com/package/figlet) - This project aims to fully implement the FIGfont spec in JavaScript.


## Screenshots and Examples📌


### Main menu

![image](https://user-images.githubusercontent.com/59363092/85843269-40066500-b7a1-11ea-99dd-48b4ea93a735.png)

### Get youtube trends 
![image](https://user-images.githubusercontent.com/59363092/85843640-bc00ad00-b7a1-11ea-90b7-15fbe510e946.png)


`/docs/trends.json`
```json
[
  {
    "position": 0,
    "title": "String",
    "visits": "String",
    "hoursAgo": "String",
    "duration": "String",
    "img": "String"
  },
]
```

### Get channel information 

![image](https://user-images.githubusercontent.com/59363092/85842414-f8cba480-b79f-11ea-8f2e-cc096067ca60.png)

![image](https://user-images.githubusercontent.com/59363092/85842480-0d0fa180-b7a0-11ea-85ae-3b43d902246b.png)

![image](https://user-images.githubusercontent.com/59363092/85842509-1993fa00-b7a0-11ea-8fa4-6f390f61f77d.png)

`/docs/channelInfo.json`
```json
{
  "title": "String",
  "subscribers": "String",
  "description": "String",
  "creationDate": "String",
  "visits": "String",
  "links": [
    {
      "name": "String",
      "href": "String"
    }
  ]
}
```
### Get lastest videos from a youtube channel

![image](https://user-images.githubusercontent.com/59363092/85842414-f8cba480-b79f-11ea-8f2e-cc096067ca60.png)

![image](https://user-images.githubusercontent.com/59363092/85842480-0d0fa180-b7a0-11ea-85ae-3b43d902246b.png)

![image](https://user-images.githubusercontent.com/59363092/85843412-6e844000-b7a1-11ea-9d34-e68c6a07432c.png)

`/docs/lastest.json`
```json
[
  {
    "position": int,
    "title": "String",
    "visits": "String",
    "hoursAgo": "String",
    "duration": "String",
    "img": "String"
  }
]
```
### Get video information

![image](https://user-images.githubusercontent.com/59363092/85843835-139f1880-b7a2-11ea-8e48-b9815f7a2333.png)
![image](https://user-images.githubusercontent.com/59363092/85843882-29acd900-b7a2-11ea-8720-b341fc76d7a7.png)

![image](https://user-images.githubusercontent.com/59363092/85843903-38938b80-b7a2-11ea-9b6e-d9e12d102857.png)

`/docs/videoInfo.json`
```json
{
  "title": "String",
  "visits": "String",
  "description": "String",
  "publicationDate": "String",
  "likes": "String",
  "dislikes": "String",
  "related": [
    {
      "position": 0,
      "title": "String",
      "channel": "String",
      "href": "String"
    }
  ]
}
```

## How to use this code ⚙️

1. You [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repository 
2. Install all the dependences with `npm install`
3. Finally you can run the application with the command `npm start`. 

## Authors ✒️
**Javier Linares** - *Initial work* - [soyjavierlinares](https://github.com/soyjavierlinares)

