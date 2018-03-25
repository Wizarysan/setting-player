const http = require('http');
const parseUrl = require('parseurl');
const path = require('path');
const express = require('express');
const fs = require('fs');
const NodeID3 = require('node-id3');
const mp3Duration = require('mp3-duration');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '')));

app.all('/api/track', (req, res) => {
  res.sendFile(path.join(__dirname, 'music/', req.body.track));
})

app.all('/api/playlist', (req, res) => {

  let results = [],
      promises = [];
  // {
  //       artist: tags.artist,
  //       title: tags.title,
  //       length,
  //     }
      //lenghtReadyFlag = true;

  fs.readdir(path.join(__dirname, 'music/'), (err, files)=> {
    files.map(function(filename){
      let file = path.join(__dirname, 'music/', filename),
          tags = NodeID3.read(file),
          length = 0;

          //Refactor
          let lgPromise = mp3Duration(file, function (err, duration) {
            if (err) return console.log(err.message);
            //lenghtReadyFlag = false;
          });

          promises.push(lgPromise);

          lgPromise.then(length=>{
            results.push({
              artist: tags.artist,
              name: tags.title,
              file: filename,
              length,
            })
            // console.log(results)
          })
    })

    console.log(promises)
    Promise.all(promises).then(()=> {
      console.log('all resolved')
      res.send(results);
    })
  })





  // let result = NodeID3.read(file, function(err, tags) {return tags;})
  // console.log(result)

})

app.get('*', (req, res) => {
  res.sendFile('index.html');
});

console.log('\x1b[36m%s\x1b[0m', 'Music app listening on port 3010');
app.listen(3010);
