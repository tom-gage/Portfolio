const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const { Console } = require('console');
const app = express()
const haikuDetect = require('./myModules/haikuDetection/haikuDetect');

app.use(express.static(__dirname + '/views'))
app.use('/js/', express.static(path.join(__dirname, 'node_modules/three/build/')))
app.use('/myThreeCode/', express.static(path.join(__dirname, 'views/3dStuff')))

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

let messages = [];

//index routes
app.get('/', function(req, res){
    res.render('index.ejs', {
        messagesList : JSON.stringify(messages),
        firstLine : "",
        secondLine : "",
        thirdLine : ""
    });
})


app.post('/', function(req, res){
    const message = req.body.messageInput;
    //begin some temp tests
    // console.log("begin tests");
    console.log("number of syllables in line 0: " + haikuDetect.getNumberOfSyllables(haikuDetect.getLineFromHaiku(message, 0)));
    //tests end here

    isHaiku = haikuDetect.detectHaiku(message)

    if(isHaiku){
        messages.push(message);
    }

    res.render('index.ejs',{
        messagesList : JSON.stringify(messages),
        firstLine : haikuDetect.getNumberOfSyllables(haikuDetect.getLineFromHaiku(message, 0)) + " : " + haikuDetect.getLineFromHaiku(message, 0),
        secondLine : haikuDetect.getNumberOfSyllables(haikuDetect.getLineFromHaiku(message, 1)) + " : " + haikuDetect.getLineFromHaiku(message, 1),
        thirdLine : haikuDetect.getNumberOfSyllables(haikuDetect.getLineFromHaiku(message, 2)) + " : " + haikuDetect.getLineFromHaiku(message, 2)
    });
})




//three js routes
app.get('/3d', function(req, res){
    res.render('3dStuff/3d.ejs', { 
        messagesList : JSON.stringify(messages)
    });
})


//messages api
app.get('/messages', function(req, res){
    res.send(JSON.stringify(messages));
    messages = [];
})

app.listen(9001, () => console.log('Visit http://127.0.0.1:9001'))