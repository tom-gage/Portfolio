const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express')
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
    messages.push(req.body.myInput);

    res.render('index.ejs',{
        messagesList : JSON.stringify(messages)
    });

    console.log(messages)
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