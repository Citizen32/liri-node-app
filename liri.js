var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("spotify-web-api-node");
var input = process.argv[2];
var twitterAPI = new Twitter(keys.twitter);
var spotifyAPI = new Spotify(keys.spotify);


function activity(command) {
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
    }
}
activity(input);
// TWITTER FUNCTION ================================================
function twitter() {
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'nodejs', limit: 1};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("=============================================");
                console.log("==============NEW TWEETS=====================");
                console.log("=============================================");
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}
