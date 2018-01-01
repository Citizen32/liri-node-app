// DEPENDENCIES ====================================
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inputOne = process.argv[2];
var inputTwo = process.argv[3];
var twitterAPI = new Twitter(keys.twitterKeys);
var spotifyAPI = new Spotify(keys.spotifyKeys);


function activity(command, userInput) {
  switch (command) {
    case "my-tweets":
    twitter();
    break;
    case "spotify-this-song":
    spotifySong(userInput);
    break;
    case "movie-this":
    movie(userInput);
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

function movie(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
     
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};
// PSEUDO CODE FOR IMDB FUNCTION ===============================================
// Create: function movie() to run the IMDB movie search =======================
// Create a varible with the OMDB URL and API Keys =============================
// Create an Conditional statement =============================================
// First If statement will search for Mr. Nobody if the input is undefined or null ==================
// Second statement will search for the movie the user input ===================
// We "request" the query URL and console. log our results:
                // TITLE:
                // YEAR:
                // RATING:
                // ETC...
