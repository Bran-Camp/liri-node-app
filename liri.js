var keys = require('./keys.js');

var twitModule = require('twitter');
var spotModule = require('spotify');

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
			spotModule.lookup(spotParams, spotCallBack); 
		} else{
			var spotParams = {
				type: 'track',
				query: process.argv[3]		
			};
			spotModule.search(spotParams, spotCallBack); 
		}
		
		break;

}


function tCallBack(err, twts, res) {
	
	if(!err) {	
		// console.log(twts);
		twts.forEach(twtTxt);
	}
	
}

function spotCallBack(err, data) {
	//console.log(err);
	//console.log(data);
	if(data.Contains(tracks)) {
		console.log("Artist: " + data.tracks.items[0].artists[0].name + "\r\nSong title: " + data.tracks.items[0].name + " \r\nAlbum: " + data.tracks.items[0].album.name + "\r\nSong link: " + data.tracks.items[0].preview_url);	
	} else{
		console.log("Artist: " + data.tracks.artists[0].name + "\r\nSong title: " + data.tracks.name + " \r\nAlbum: " + data.tracks.album.name + "\r\nSong link: " + data.tracks.preview_url);	
	}
}



function twtTxt(eachTweet) {
		console.log("Tweet:" + " " + eachTweet.text + " Created at:" + " " + eachTweet.created_at.substring(0, 19));
	}