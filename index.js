// in case of issue
//  npm install --save node-spotify-api  https://www.npmjs.com/package/node-spotify-api
//npm  install --save twitter   https://www.npmjs.com/package/twitter
//npm install --save request  https://www.npmjs.com/package/request
// npm install --save fs



var twitterkeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
var addToTxt;
var x =1;
var movieTitle;
function appendTxt(){
  // As always, we grab the fs package to handle read/write
  var fs = require("fs");
  
  // We then store the textfile filename given to us from the command line
  var textFile = 'log.txt';
  
  // We then append the contents "Hello Kitty" into the file
  // If the file didn't exist then it gets created on the fly.
  fs.appendFile(textFile,addToTxt, function(err) {
  
    // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added!");
    }
  
  });
  
  }
//WHo ever grades this having my keys in a secound file didnt work. 
var client = new Twitter({
  twitterkeys,
  consumer_key: 'TywnEAIP2wTqFfCXTMyDZmdbC',
  consumer_secret: 'a5LMFaCpYRt9lOhaIr46cidF1njrn8mUyiBm9inebBSXmISnG1',
  access_token_key: '932356741563650048-L9n1XjSWPyhTrtVjAMmKheE8tUJ77Ud',
  access_token_secret: 'qDud79a7BB08eaElOCAd6nGZOWmKfXiq97fb44nfg4f0u',
});
userinput = process.argv[2];

if (userinput === 'my-tweets') {
  twitter();
};
if (userinput === 'spotify-this-song') {
  findSong();
}
if (userinput === 'movie-this') {
  findMovie();
}
if (userinput === 'do-what-it-says') {
  doIt();
}

function twitter() {

  inquirer.prompt([
    {
      name: "name",
      message: "Enter Screen Name",
      default: 'dahorn689',
    }
  ]).then(function (answers) {
    var params = { screen_name: answers.name };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

      if (!error) {
        for (i = 0; i < 20; i++) {
          addToTxt='\n ' + answers.name + "'s Tweet: " + tweets[i].text + '\n ' +'Time Of Tweet: '+   tweets[i].created_at
          + '\n';
          console.log(answers.name + "'s Tweets"+ tweets[i].text);
          console.log('Time Of Tweet: ' +tweets[i].created_at)
appendTxt();
        }
      }
      

    });
  });
}

function findSong() {

  var spotify = new Spotify({
    id: "97c53ebdcaff44c49a2d6123148a7ac0",
    secret: "a0b3dc5a02aa41a9bb03351a6b723a3f"
  });
  inquirer.prompt([
    {
      name: "type",
      message: "artist or track",
      default: 'track',
    }, {
      name: "search",
      message: "What do you want to search?",
      default: 'highway to hell',
    }
  ]).then(function (answers) {
    spotify.search({ type: answers.type, query: answers.search, limit: 5 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      if (answers.type === 'artist') {

        addToTxt= '\n'+   'Artist Name: ' + data.tracks.items[i].artists[0].name + '\n'+ 'Genres: ' + data.artists.items[0].genres + '\n '+
        'Artist Popularity Level: ' + data.artists.items[0].popularity + '\n '+ 'Preview Link: ' + data.artists.items[0].external_urls.spotify
      +'\n '

        console.log('Artist Name: ' + data.artists.items[0].name);
        console.log('Genres: ' + data.artists.items[0].genres);
        console.log('Artist Popularity Level: ' + data.artists.items[0].popularity);
        console.log('Preview Link: ' + data.artists.items[0].external_urls.spotify);
        appendTxt();
      }

      if (answers.type === 'track') {
        x = 0;
        for (i = 0; i < 5; i++) {
          addToTxt= '\n'+   'Artist Name: ' + data.tracks.items[i].artists[0].name + '\n'+ 'Track Name: ' + data.tracks.items[i].name + '\n '+
          'Track Popularity Level: ' + data.tracks.items[i].popularity + '\n '+ 'Is the song explicit(T/F)S: ' + data.tracks.items[i].explicit+
          '\n '+ 'Artist Preview Link: ' + data.tracks.items[i].artists[0].external_urls.spotify +'\n '

          console.log('*Artist Name: ' + data.tracks.items[i].artists[0].name);

          console.log('Track Name: ' + data.tracks.items[i].name);
          console.log('Track Popularity Level: ' + data.tracks.items[i].popularity);
          console.log('Album Name: ' + data.tracks.items[i].album.name);
          console.log('Is the song explicit(T/F)S: ' + data.tracks.items[i].explicit);
          console.log('Artist Preview Link: ' + data.tracks.items[i].artists[0].external_urls.spotify + '\n');
appendTxt();

        }
      }


    });
  });
}

function findMovie() {

  inquirer
    .prompt([{
      type: "input",
      message: "Enter a movie Title",
      name: "hotdog",
      default: "avengers"
    }
    ])
    .then(function (answers) {

      request("http://www.omdbapi.com/?t=" + answers.hotdog + "&y=&plot=short&apikey=40e9cece",
        function (error, response, body) {
          movieTitle = JSON.parse(body).Title;
         
          if (!error && response.statusCode === 200) {
addToTxt = '\n' + 'The Title of the Movie: ' + JSON.parse(body).Title + '\n' + 
movieTitle + ' was Released : ' + JSON.parse(body).Released + '\n' + 
movieTitle + ' was Directed by: ' + JSON.parse(body).Director +
'\n' + 'The Actors in '+ movieTitle+ ' are: ' + JSON.parse(body).Actors + '\n' +
'The Plot of ' + movieTitle +' is: ' + JSON.parse(body).Plot +'\n'+
'The Country '+ movieTitle + ' was produce in: '+ JSON.parse(body).Country + '\n'+
movieTitle+' was rated: '+ JSON.parse(body).Metascore + ' by MetaCritic' + '\n' +
movieTitle+' was rated' + JSON.parse(body).imdbRating + 'IMDB' +'\n';
appendTxt();
           
            console.log('The Title of the Movie: ' + JSON.parse(body).Title);
            console.log(movieTitle + ' was Released : ' + JSON.parse(body).Released);
            
            console.log(movieTitle + ' was Directed by: ' + JSON.parse(body).Director);
            console.log('The Actors in '+ movieTitle+ ' are: ' + JSON.parse(body).Actors);
            console.log('The Plot of ' + movieTitle +' is: ' + JSON.parse(body).Plot);
            console.log('The Country '+ movieTitle + ' was produce in: '+ JSON.parse(body).Country)
            console.log(movieTitle+' was rated: '+ JSON.parse(body).Metascore + ' by MetaCritic')
            console.log(movieTitle+' was rated' + JSON.parse(body).imdbRating + 'IMDB');

          }
          // })
        });
    });
}
function doIt() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    // console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    for (var i = 0; i < dataArr.length; i++) {
      dataArr[i] = dataArr[i].trim();

    }

    song = dataArr[1]
    spot2();
    // We will then re-display the content as an array for later use.
    // console.log(dataArr);

  });
}

function spot2() {

  console.log(song)
  var spotify = new Spotify({
    id: "97c53ebdcaff44c49a2d6123148a7ac0",
    secret: "a0b3dc5a02aa41a9bb03351a6b723a3f"
  });
  spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }



    for (i = 0; i < 5; i++) {
if(x >1){
  addToTxt= '\n'+   'Artist Name: ' + data.tracks.items[i].artists[0].name + '\n'+ 'Track Name: ' + data.tracks.items[i].name + '\n '+
 'Track Popularity Level: ' + data.tracks.items[i].popularity + '\n '+ 'Is the song explicit(T/F)S: ' + data.tracks.items[i].explicit+
 '\n '+ 'Artist Preview Link: ' + data.tracks.items[i].artists[0].external_urls.spotify +'\n '
}
if(x<=1){
  addToTxt=
   'Artist Name: ' + data.tracks.items[i].artists[0].name + '\n'+ 'Track Name: ' + data.tracks.items[i].name + '\n '+
 'Track Popularity Level: ' + data.tracks.items[i].popularity + '\n '+ 'Is the song explicit(T/F)S: ' + data.tracks.items[i].explicit+
 '\n '+ 'Artist Preview Link: ' + data.tracks.items[i].artists[0].external_urls.spotify +'\n '
}

      console.log('Artist Name: ' + data.tracks.items[i].artists[0].name);

      console.log('Track Name: ' + data.tracks.items[i].name);
      console.log('Track Popularity Level: ' + data.tracks.items[i].popularity);
      console.log('Album Name: ' + data.tracks.items[i].album.name);
      console.log('Is the song explicit(T/F)S: ' + data.tracks.items[i].explicit);
      console.log('Artist Preview Link: ' + data.tracks.items[i].artists[0].external_urls.spotify + '\n');
      x++;
appendTxt();

    }




  })
}
