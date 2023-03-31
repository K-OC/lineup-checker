# lineup-checker
Compare list of players against starting lineups on baseballreference.com, return csv with T/F values. 

Basic tool for checking lineups. I noticed in my Yahoo Fantasy App that players were showing "not in starting lineup" despite sites such as baseballreference.com reporting that they were in the starting lineup. To ensure I could get the best information, I implemented this scripts to check the starting lineups agains an array of player names. The scripts will output to a JSON with a provided list of players. 

As of today and injury checker has been added to this tool. A refactoring of the code will follow to make the app easier to use. 


# to use


<ul>
  <li>clone repo</li>
  <li>cd lineup-checker</li>
  <li>for first use run npm i
</li>
  <li>node app.js
</li>
<li>observe CSV generated in project folder
</li>
</ul>
