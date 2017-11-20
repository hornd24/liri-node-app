// var twitterkey = require("./keys.js");
// var Twitter = require('twitter');

// var params = {screen_name: 'dahorn689'};
// twitterkey.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
 id: "97c53ebdcaff44c49a2d6123148a7ac0",
 secret: "a0b3dc5a02aa41a9bb03351a6b723a3f"
});

// spotify.search({ type: 'track', query: 'All the Small Things',limit: '2' }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }
//  var hey =data
// console.log(hey); 
// });

spotify.search({ type: 'artist', query: 'jon bellion' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// spotify.get(query, hollaback)
//   spotify.search({ type:'track', query: 'All the Small Things',limit: '2' }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }
 var hey =data
console.log(hey); 
console.log('bitches on ice')
});
