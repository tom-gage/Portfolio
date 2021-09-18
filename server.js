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


app.get('/messages', function(req, res){
    res.send(JSON.stringify(messages));
    messages = [];
})

server.listen(process.env.PORT || 9000, function(req, response){
    console.log("listening on port 9000");
})