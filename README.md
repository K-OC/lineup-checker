# lineup-checker
Compare list of players against starting lineups on baseballreference.com, return csv with T/F values. 

Basic tool for checking lineups. I noticed in my Yahoo Fantasy App that players were showing "not in starting lineup" despite sites such as baseballreference.com reporting that they were in the starting lineup. To ensure I could get the best information, I implemented this scripts to check the starting lineups agains an array of player names. The script will output a CSV with the provided list of players, and a row for True or False to indicate whether they are in the starting lineup. 

# to use

clone repo
cd lineup-checker
for first use run `npm i`
`node app.js`
observe CSV generated in project folder
