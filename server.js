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
    console.log("number of syllables in line 0: " + getNumberOfSyllables(getLineFromHaiku(message, 0)));
    //tests end here

    isHaiku = detectHaiku(message)

    if(isHaiku){
        messages.push(message);
    }

    res.render('index.ejs',{
        messagesList : JSON.stringify(messages),
        firstLine : getNumberOfSyllables(getLineFromHaiku(message, 0)) + " : " + getLineFromHaiku(message, 0),
        secondLine : getNumberOfSyllables(getLineFromHaiku(message, 1)) + " : " + getLineFromHaiku(message, 1),
        thirdLine : getNumberOfSyllables(getLineFromHaiku(message, 2)) + " : " + getLineFromHaiku(message, 2)
    });
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
    return (potentialHaiku.match(/\n/g) || '').length + 1 //counts the length of the array returned by str.match()

}

function getLineFromHaiku(potentialHaiku, lineNumber){
    let currentLineIndex = 0;
    let beginingOfSlice = 0;
    let endOfSlice = 0;

    for (i = 0; i < potentialHaiku.length; i++){
        endOfSlice++;

        if (potentialHaiku[i] == '\n' || i + 2 > potentialHaiku.length){

            if(currentLineIndex == lineNumber){
                return potentialHaiku.slice(beginingOfSlice, endOfSlice);
            }
            beginingOfSlice = endOfSlice
            currentLineIndex++;
        }

    }

    return "";

}

function getNumberOfSyllables(sentence){
    let syllableCount = 0;

    let vowelsPattern = /[aeiouy]/gi

    const consecutiveVowelsPattern = /[aeiouy][aeiouy]/gi

    const consecutiveVowelsExceptionsPattern = /eo\b/gi

    const silentEPattern = /[aeiouy][bcdfghjklmnpqrstvwxz]e\b|[bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz]e\b|\b[aeiouy]y[aeiouy]\b/gi

    const silentEExceptionsPattern = /[iy]re\b/gi

    const endingInSMPattern = /sm\b/gi

    //count the vowels in the sentance
    while (vowelsPattern.exec(sentence)) {
        ++syllableCount;
    }


    //for each pair of consecutive vowels, subtract one
    while (consecutiveVowelsPattern.exec(sentence)) {
        --syllableCount;
    }

    while (consecutiveVowelsExceptionsPattern.exec(sentence)) {
        ++syllableCount;
    }


    //for each word ending in a silent e, subtract one
    while (silentEPattern.exec(sentence)) {
        --syllableCount;
    }

    while (silentEExceptionsPattern.exec(sentence)) {
        ++syllableCount;
    }

    //for each word ending in sm, add one
    while (endingInSMPattern.exec(sentence)) {
        ++syllableCount;
    }

    if(syllableCount < 1){
        return 1
    }

    return syllableCount;
    
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