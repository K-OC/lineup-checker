const puppeteer = require('puppeteer');
const fs = require('fs');
const myTeam = require('./myTeam.json');
async function scrapeCBSsports() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Set user agent string
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');

  await page.goto('https://www.cbssports.com/mlb/injuries/');
  await page.waitForSelector('#TableBase tbody tr')

  
  // Wait for the table to load
  await page.waitForSelector('#TableBase');

  // Extract data from the table
  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#TableBase tbody tr'));

    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td'));

      return {
        name: cells[0].innerText.trim(),
        status: cells[4].innerText.trim(),
      };
    });
  });

  await browser.close();
  return data;
}


async function updateInjuries(results, myTeam) {
    for (let i = 0; i < myTeam.length; i++) {
      const player = myTeam[i];
      const scrapedPlayer = results.find(p => p.name === player.name);
  
      if (scrapedPlayer) {
        player.injured_list = scrapedPlayer.status;
    } else {
        player.injured_list = "";
      }
    }
  
    // Write updated data to myTeam.json file
    fs.writeFile('./myTeam.json', JSON.stringify(myTeam, null, 2), err => {
      if (err) {
        console.error('Error writing to myTeam.json:', err);
      } else {
        console.log('myTeam.json updated successfully');
      }
    });
  }
scrapeCBSsports().then(async data => await updateInjuries(data, myTeam) && console.log(data));