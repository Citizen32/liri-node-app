var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inputOne = process.argv[2];
var inputTwo = process.argv[3];
var twitterAPI = new Twitter(keys.twitterKeys);
var spotifyAPI = new Spotify(keys.spotifyKeys);


function activity(command, userInput) {
  switch (inputOne) {
    case "my-tweets":
    twitter();
    break;
    case "spotify-this-song":
    spotifySong(userInput);
    break;
    case "movie-this":
    movie();
    break;
    case "do-what-it-says":
    loadFile();
    break;
  }
}
activity(inputOne, inputTwo);

// TWITTER FUNCTION ============================================================
function twitter() {

  var params = {screen_name: 'nodejs', limit: 1};

  twitterAPI.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("=============================================");
        console.log("==================NEW TWEETS=================");
        console.log("=============================================");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
}

// SPOTIFY FUNCTION ============================================================
function spotifySong(){

  spotifyAPI.search({type: 'track', query: inputTwo, limit: 5}, function(err, data){

    if (err){
      return console.log('Error occurred: ' + err);
    }

    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("=================New Song==================")
      console.log("Artist: " + data.tracks.items[i].artists[0].name);
      console.log("Song: " + data.tracks.items[i].name);
      console.log("Preview Link: " + data.tracks.items[i].external_urls.spotify);
      console.log("Album: " + data.tracks.items[i].album.name + "\n");
      console.log("*******************************************")
    }
  });
}

function movie() {
    if (inputTwo === "" || inputTwo === undefined) {
        movies = "Mr. Nobody";
    } else {
        movies = inputTwo;
    }
    console.log(movies);
    console.log(omdbKey);

    var queryURL = "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=" + omdbKey;
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log("Title: " + info.Title);
            console.log("Year: " + info.Year);
            console.log("IMDB Rating: " + info.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + info.Ratings[1].Value);
            console.log("Country: " + info.Country);
            console.log("Language: " + info.Language)
            console.log("Plot: " + info.Plot);
            console.log("Actors: " + info.Actors);
        }
    })



};
