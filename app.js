const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const myTeam = [
    "Alejandro Kirk",
    "José Abreu",
    "Tommy Edman",
    "Ty France",
    "Trea Turner",
    "Cedric Mullins",
    "Bryan Reynolds",
    "Amed Rosario",
    "Alex Verdugo",
    "Luis García",
    "Santiago Espinal",
    "Luis Arraez",
    "Trey Mancini",
    "Gerrit Cole",
    "Justin Verlander",
    "Daniel Bard",
    "Alex Lange",
    "Framber Valdez",
    "Logan Webb",
    "José Urquidy",
    "Paul Sewald",
    "Jeffrey Springs",
    "Luis Garcia",
  ];
  const andrewsTeam = [
    "Gabriel Moreno",
    "Christian Walker",
    "Andrés Giménez",
    "Austin Riley",
    "Oneil Cruz",
    "Julio Rodríguez",
    "Yordan Alvarez",
    "Jake McCarthy",
    "Nick Castellanos",
    "Ke'Bryan Hayes",
    "Wander Franco",
    "Anthony Rizzo",
    "Andrew Benintendi",
    "Anthony Volpe",
    "Trevor Story",
    "Sandy Alcantara",
    "Brandon Woodruff",
    "Josh Hader",
    "Félix Bautista",
    "Julio Urías",
    "David Robertson",
  ];
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

  function searchLineup(lineup, players) {
    // Create an array to hold the results
    const results = [["Player Name", "Found in Lineup"]];

    // Loop through each player in the second list
    for (const player of players) {
      // Check if the player is present in the first list
      const found = lineup.includes(player);

      // Add a new row to the results array with the player name and whether they were found
      results.push([player, found ? "true" : "false"]);
    }

    // Write the results to a CSV file
    const csv = results.map((row) => row.join(",")).join("\n");
    fs.writeFileSync("results.csv", csv);

    // Return the results array for further processing if needed
    return results;
  }

  searchLineup(playerNames, andrewsTeam);
  await browser.close();
})();
