const puppeteer = require("puppeteer");
const fs = require("fs");
const myTeam = require("./myTeam.json");

async function updateStartingLineup() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.baseballpress.com/lineups");

  // wait for the lineup table to be loaded
  await page.waitForSelector(".lineup-card-header");

  const playerNames = await page.evaluate(() => {
    const players = Array.from(
      document.querySelectorAll(".lineup-card-body .player")
    )
      .map((player) => {
        // get the text content of the player's name element
        const nameElement = player.querySelector(".player-link");
        if (nameElement) {
          return nameElement.textContent.trim();
        }
        return null;
      })
      .filter((name) => name !== null);
    return players;
  });

  for (let i = 0; i < myTeam.length; i++) {
    const player = myTeam[i];
    const found = playerNames.includes(player.name);

    if (found) {
      player.starting_lineup = true;
      console.log(player);
    } else {
      player.starting_lineup = false;
    }
  }

  // Write updated data to myTeam.json file
  fs.writeFile("./myTeam.json", JSON.stringify(myTeam, null, 2), (err) => {
    if (err) {
      console.error("Error writing to myTeam.json:", err);
    } else {
      console.log("myTeam.json updated successfully");
    }
  });

  await browser.close();
}

updateStartingLineup();