var require = require("./keys.js");

var input = process.argv[2];
var choice = process.arg[3];

var twitter = require("twitter");

switch (input) {
  case "my-tweets":
    twitter();
    break;
  default:

  case "spotify-this-song":
    spotify();
    break;
  default:

  case "movie-this":
    movie();
    break;
  default:

  case "do-what-it-says":
    break;
  default:
};
