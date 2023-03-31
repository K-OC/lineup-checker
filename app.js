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
    } else {
      player.starting_lineup = false;
    }
  }

  // Write updated data to myTeam.json file
  fs.writeFile("./myTeam.json", JSON.stringify(myTeam), (err) => {
    if (err) {
      console.error("Error writing to myTeam.json:", err);
    } else {
      console.log("myTeam.json updated successfully");
    }
  });

  await browser.close();
}

updateStartingLineup();




// const myTeam = [
//   "Alejandro Kirk",
//   "José Abreu",
//   "Tommy Edman",
//   "Ty France",
//   "Trea Turner",
//   "Cedric Mullins",
//   "Bryan Reynolds",
//   "Amed Rosario",
//   "Alex Verdugo",
//   "Luis García",
//   "Santiago Espinal",
//   "Luis Arraez",
//   "Trey Mancini",
//   "Gerrit Cole",
//   "Justin Verlander",
//   "Daniel Bard",
//   "Alex Lange",
//   "Framber Valdez",
//   "Logan Webb",
//   "José Urquidy",
//   "Paul Sewald",
//   "Jeffrey Springs",
//   "Luis Garcia",
// ];
// const andrewsTeam = [
//   "Gabriel Moreno",
//   "Christian Walker",
//   "Andrés Giménez",
//   "Austin Riley",
//   "Oneil Cruz",
//   "Julio Rodríguez",
//   "Yordan Alvarez",
//   "Jake McCarthy",
//   "Nick Castellanos",
//   "Ke'Bryan Hayes",
//   "Wander Franco",
//   "Anthony Rizzo",
//   "Andrew Benintendi",
//   "Anthony Volpe",
//   "Trevor Story",
//   "Sandy Alcantara",
//   "Brandon Woodruff",
//   "Josh Hader",
//   "Félix Bautista",
//   "Julio Urías",
//   "David Robertson",
// ];