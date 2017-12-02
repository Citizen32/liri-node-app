var require = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var input = process.argv[2];

var twitterAPI = new Twitter(keys.twitter);
var spotifyAPI = new Spotify(keys.spotify);

function activity (command) {
  var nodeArg = processArg(process.argv);
  appendLog(command + " " + nodeArg);
  switch (input) {
    case "my-tweets":
      twitter();
      break;

    case "spotify-this-song":
      spotify();
      break;

    case "movie-this":
      movie();
      break;

    case "do-what-it-says":
      loadFile();
      break;
  };
}

activity(input);

// TWITTER FUNCTION ================================================
function twitter(){

  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'nodejs'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++){
      console.log(tweet.text + " " + tweet.created_at + " by " + tweet.user.screen_name);
    }
  }

});


}
