import puppeteer from "puppeteer";
import fs from "fs";
import moment from "moment"
const url ="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html#wb-auto-4";
import {writeDataToFile} from './modules/excel.js'
const dataArray = []
const dateArray = []



const accessScore = async (page) => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let time = dateObj.getHours() + "-" + dateObj.getMinutes()
  let newdate = year + "-" + month + "-" + day;
  let dataHandler = await page.$x("/html/body/main/div[3]/div/div/div[1]/div[2]/text()")
  const entries = await page.evaluate((el) => el.textContent, dataHandler[0]);
  const iteractions = parseInt(entries.split(" ").reverse().splice(1, 1));
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j <= 25; j++) {
      let elHandle = await page.$x(`/html/body/main/div[3]/div/div/table/tbody/tr[${j}]/td[5]`)
      if(!elHandle) return
      let score = await page.evaluate((el) => el.textContent, elHandle[0]);
      if(!score) return
      let dateHandle = await page.$x(`/html/body/main/div[3]/div/div/table/tbody/tr[${j}]/td[2]`)
      if(!dateHandle) return
      let date = await page.evaluate((el) => el.textContent, dateHandle[0]);
      if(!date) return
      dataArray.push(parseInt(score))
      const auxiliaryDate = moment(date).format("YYYY-MM-DD")
      moment(auxiliaryDate).format('YYYY-MM-DD')
      dateArray.push(auxiliaryDate)
      await fs.writeFileSync(`./data/results/[${newdate}]-[${time}]-CRS-SCORES.txt`, `${date} -> ${score}\n`, { encoding: "utf8", flag: "a", mode: 0o666 });
    }
    await page.screenshot({ path: `./data/images/[${newdate}]-[${time}]-page-${i}.png`, fullPage: true })
    if (i === 5){
      const txtObject = await page.$x(`/html/body/main/div[3]/div/div/div[2]/div/ol/li[7]/a`)
      await txtObject[0].click()
    }else{
      const txtObject = await page.$x(`/html/body/main/div[3]/div/div/div[2]/div/ol/li[8]/a`)
      if (!txtObject) return
      await txtObject[0].click()
    }
    
  }


  writeDataToFile("results.xlsx", dateArray, dataArray)

};

const extractPageData = async (url) => {
  const browserConfigs = {headless: false}
  const browser = await puppeteer.launch(browserConfigs)
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(url)
  setTimeout(async () => {
    await accessScore(page)
    await browser.close()
  }, 3000)
}
extractPageData(url)