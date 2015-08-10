////////////DEPENDENCIES///////////////////
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var twilio = require('twilio');

// Twilio Credentials 
var accountSid = 'AC1ac1607109e8bb8082ae21bfa593c4fe'; 
var authToken = 'ca6a52a8029cbf27d132dd9116d50a2b'; 

var client = twilio(accountSid, authToken); 

var server = express();
var port = 8080;

//Middleware///
server.use(express.static('public'));

server.listen(port, function (){
    console.log("I'm still watching you", port)
});

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());
server.use(cors());

var messages = [{message: 'Fuck you'}];

server.get('/api/testData/:attitude', function(req, res) {
    console.log("req.params: ", req.params)
    console
    return res.json((messages));
});

server.post('/api/send_textMessage', function(req,res){
    console.log(req.body.message);
    // request.post('https://' + accountSid + ":" + authToken + "@api.twilio.com/2010-04-01/Accounts/")
    client.messages.create({ 
	to: "4257618832",   //4257618832
	from: "+19712056358", 
	body: req.body.message  
    });
});

server.post('/api/receive_message', function(req, res){
    console.log(req.body);
    var newMessage = req.body.message
    messages.push(newMessage);
    res.json((messages));
});



server.put('/api/person/:id,', function(req, res){
    var ourId = req.params.id;
});
