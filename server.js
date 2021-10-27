const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const { Console } = require('console');
const app = express()

app.use(express.static(__dirname + '/views'))
app.use('/js/', express.static(path.join(__dirname, 'node_modules/three/build/')))
app.use('/myThreeCode/', express.static(path.join(__dirname, 'views/3dStuff')))

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

let messages = [];

//index routes
app.get('/', function(req, res){
    res.render('index.ejs', {
        messagesList : JSON.stringify(messages)
    });
})


app.post('/', function(req, res){
    const message = req.body.messageInput;
    messages.push(message);
    isHaiku = false;

    //begin some temp tests
    // console.log("begin tests");
    // console.log(getLineFromHaiku(message, 2));

    res.render('index.ejs',{
        messagesList : JSON.stringify(messages)
    });

    console.log(messages)
})

function detectHaiku(potentialHaiku){
    let line;
    let syllableCount;

    if(countNewLines(potentialHaiku) > 3){
        return false;
    }
    
    line = getLineFromHaiku(potentialHaiku, 0);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 5){
        return false;
    }

    line = getLineFromHaiku(potentialHaiku, 1);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 7){
        return false;
    }

    line = getLineFromHaiku(potentialHaiku, 2);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 5){
        return false;
    }

    return true;
}

function countNewLines(potentialHaiku){
    return (str.match(/\n/g) || '').length + 1 //counts the length of the array returned by str.match()

}

function getLineFromHaiku(potentialHaiku, lineNumber){
    let currentLineIndex = 0;
    let beginingOfSlice = 0;
    let endOfSlice = 0;

    console.log("begin: getLineFromHaiku()")

    for (i = 0; i < potentialHaiku.length; i++){
        endOfSlice++;



        if (potentialHaiku[i] == '\n' || i + 2 > potentialHaiku.length){

            console.log("COMPARING: " + currentLineIndex + " VS " + lineNumber);

            if(currentLineIndex == lineNumber){
                return potentialHaiku.slice(beginingOfSlice, endOfSlice);
            }

            beginingOfSlice = endOfSlice
            currentLineIndex++;
        }

    }

    return "error!";

}

function getNumberOfSyllables(sentance){

}


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