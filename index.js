const express = require('express');
const app = express()

const PORT = 3000

app.get('/',function(req,res){
    res.sendFile(__dirname+"/views/index.html");
});

const server = app.listen(PORT,function(){
    console.log("Server is runinng at port "+PORT);
});

const SocketServer = require('ws').Server;
const wss = new SocketServer({ server });

let button_status = "off";

wss.on('connection', function(ws){
	console.log('Client connected');
	ws.send(button_status);
	ws.on('message', function(msg){
		button_status = msg.toString();
		console.log(button_status);
		broadcast(button_status);
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