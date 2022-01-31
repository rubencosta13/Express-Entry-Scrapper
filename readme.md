# <center>Express Entry CRS Scrapper</center>
<center>
<p align="center">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40" height="40"/>
</p>
</center>

- [Temporary File Cleaner](#-Temporary-file-cleaner)
    - [Project Explanation](#about-this-project)
    - [Project Status](#[project-status)
    - [Configurations](#configurations)
    - [Technologies](#technologies)
    - [Help](#sos-help)


---
# <center> About This Project </center>
A simple understanding of this project:
<br />
I was looking for a way to extract data from a particular [page](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html#wb-auto-4), Canada's 🍁 Express Entry Draws.
<br />So I could build a simple Forecast System, but the draws are already at `#215` (At time of writing this ReadMe), which is a lot of data to copy and paste in a short period of time.
So I came up with this solution **A simple WebScrapper**, which allow us to:
- Make Screenshots of the pages
- Export data to a .txt file as well as CSV file or Excel
- Save time, retrieving data from the website

# <center> Project Status </center>
Todo: <br />

    Add Docker and Start the Chromium window as Headless


# <center> How to Set Up this utility </center>
1. Head up to settings.json, this should be the output of the file
```json
{
    "add_screenShots": false,
    "export_to_excel": false
}
```
    "add_screenShots" -> This is responsible for taking page screenshots
    "export_to_excel" -> This is responsible to insert data in a Excel Spreadsheet
2. Enable or Disable the options you consider useful in your case scenario
3. Navigate to the project directory:
```bash
$ cd scrapper # Navigate to project's directory
$ npm install # This installs all project's dependencies
$ npm start   # This starts the scrapper
```
    Using npm start is going to start scrapping the webpage, a chromium window should pop up, in newer versions the process will be totally headless


# <center> Technologies Used </center>
- [ExcelJs](https://github.com/exceljs/exceljs) 
- [Puppetteer](https://github.com/puppeteer/puppeteer)
- [Docker](https://www.docker.com/) [Coming soon in the next versions]

# <center> Help </center>

If you need any help send me an [email](mailto:rubenlavoscosta@gmail.com). Use the subject as: "Express Entry Scrapper"

Made with <3 by Ruben Costa