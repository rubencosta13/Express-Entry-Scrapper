import puppeteer from "puppeteer";
import fs from "fs";
const url =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html#wb-auto-4";

const accessScore = async (page) => {
  let dataHandler = await page.$x(
    "/html/body/main/div[3]/div/div/div[1]/div[2]/text()"
  );
  const entries = await page.evaluate((el) => el.textContent, dataHandler[0]);
  const iteractions = parseInt(entries.split(" ").reverse().splice(1, 1));
  for (let i = 1; i <= iteractions; i++) {
    let elHandle = await page.$x(
      `/html/body/main/div[3]/div/div/table/tbody/tr[${i}]/td[5]`
    );
    let score = await page.evaluate((el) => el.textContent, elHandle[0]);
    let dateHandle = await page.$x(
      `/html/body/main/div[3]/div/div/table/tbody/tr[${i}]/td[2]`
    );
    let date = await page.evaluate((el) => el.textContent, dateHandle[0]);
    //TODO Iterate through the pages if there is no more scores to be displayed
    //TODO Filter the results by the emigration process, specifically Express Entry only
    fs.writeFileSync(`results.txt`, `${date} -> ${score}\n`, {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666,
    });
    console.log(`${date} -> ${score}`);
  }
};

const extractPageData = async (url) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  await page.goto(url);
  await accessScore(page);
  await browser.close();
};

extractPageData(url);

//scroll /html/body/main/div[2]/p[3]
