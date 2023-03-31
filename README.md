# lineup-checker
Compare list of players against starting lineups on baseballreference.com, and injury status reports from CBS Sports. 

Basic tool for checking lineups. I noticed in my Yahoo Fantasy App that players were showing "not in starting lineup" despite sites such as baseballreference.com reporting that they were in the starting lineup. To ensure I could get the best information, I implemented this scripts to check the starting lineups agains an array of player names. The scripts will output to a JSON with a provided list of players. 

As of today and injury checker has been added to this tool. A refactoring of the code will follow to make the app easier to use. 


# to use


<ul>
  <li>clone repo</li>
  <li>cd lineup-checker</li>
  <li>for first use replace players in json file with players from your own team
</li>
<li>run npm i</li>
  <li>node app.js - currently runs lineup checker

</li>
<li>
node getInjuries.js -- update injury status
</li>
<li>observe JSON file has updated</li>
</ul>
