const express = require('express')
const app = express()

const PORT = 3000

// Serve style.css and script.js from the public folder
app.use(express.static(__dirname+"/public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

const server = app.listen(PORT,function(){
    console.log("Server is runinng at port "+PORT);
});

const SocketServer = require('ws').Server;
const wss = new SocketServer({ server });

var button_status = "off";   // Experiment 1: "on" / "off"
var brightness_status = "0"; // Experiment 2: 0 - 100

wss.on('connection', function(ws){
	console.log('Client connected');
	
	// Send the current state of both experiments to the new client
	ws.send(button_status);
	ws.send(brightness_status);

	ws.on('message', function(msg){
		msg = msg.toString();
		console.log(msg);

		if(msg == "on" || msg == "off"){
			button_status = msg;
		}else{
			brightness_status = msg;
		}
		broadcast(msg);
	});
	
	ws.on('close', function(){
		console.log('Client disconnected');
	});
});

function broadcast(msg) {
	wss.clients.forEach(function (client) {
		if (client.readyState === client.OPEN) { // if client still connected
			client.send(msg);
		}else{
			console.log("client off");
		}
	});
}