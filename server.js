const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

//app.set('views', __dirname);
app.set('view engine', 'ejs');

let messages = [];

app.get('/', function(req, res){
    res.render('index.ejs');
})

app.get('/messages', function(req, res){
    res.send(JSON.stringify(messages));
    messages = [];
})

app.post('/', function(req, res){
    res.render('index.ejs');

    messages.push(req.body.myInput);

    console.log(messages)
})

server.listen(process.env.PORT || 9000, function(req, response){
    console.log("listening on port 9000");
})