var keys = require('./keys.js');

var twitModule = require('twitter');
var spotModule = require('spotify');
var reqModule = require('request');

var twitClient = new twitModule(keys.twitterKeys);

var twitParams = {
	screenName: 'brandon26622669',
	count: 20
};

switch(process.argv[2]){
	case "my-tweets": 
		twitClient.get('statuses/user_timeline', twitParams, tCallBack);
		break;

	case "spotify-this-song":
		//console.log(process.argv.length);
		if (process.argv.length < 4) {
			var spotParams = {
				type: 'track',
				id: '0hrBpAOgrt8RXigk83LLNE'
			};
			spotModule.lookup(spotParams, spotLookUp); 
		} else{
			var spotParams = {
				type: 'track',
				query: process.argv[3]		
			};
			spotModule.search(spotParams, spotCallBack); 
		}
		
		break;

	case "movie-this":
		var reqParams = {
			url: 'http://www.omdbapi.com/?t=' + process.argv[3] + '&plot=short&tomatoes=true'
		}
		reqModule(reqParams, omdbSearch);
		break;

	default:
    	console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this}");
  		break;

}

function tCallBack(err, twts, res) {
	
	if(!err) {	
		// console.log(twts);
		twts.forEach(twtTxt);
	}
	
}

function twtTxt(eachTweet) {
		console.log("Tweet:" + " " + eachTweet.text + " Created at:" + " " + eachTweet.created_at.substring(0, 19));
	}

function spotCallBack(err, data) {
	//console.log(err);
	//console.log(data);
	console.log("Artist: " + data.tracks.items[0].artists[0].name + "\r\nSong title: " + data.tracks.items[0].name + " \r\nAlbum: " + data.tracks.items[0].album.name + "\r\nSong link: " + data.tracks.items[0].preview_url);		
}

function spotLookUp(err, data) {
	// console.log(data);
	console.log("Artist: " + data.artists[0].name + "\r\nSong title: " + data.name + " \r\nAlbum: " + data.album.name + "\r\nSong link: " + data.preview_url);	
}

function omdbSearch(err, response, body) {
	if (!err && response.statusCode == 200) {
	    var info = JSON.parse(body);
	    console.log("Title: " + info.Title +"\r\nRelease Year: " + info.Year + "\r\nIMDB Rating: " + info.imdbRating + "\r\nCountry: " + info.Country + "\r\nLanguage: " + info.Language + "\r\nPlot: " + info.Plot + "\r\nActors: " + info.Actors + "\r\nRotten Tomatoes Rating: " + info.tomatoRating + "\r\nRotten Tomatoes URL: " + info.tomatoURL);
	}
}