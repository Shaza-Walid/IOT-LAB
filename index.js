const express = require('express')
const app = express()

const PORT = 3000

// Serve style.css and script.js from the public folder
app.use(express.static(__dirname+"/public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

const server = require('http').createServer(app);

// Run the server locally only (Vercel starts it by itself)
if(require.main === module){
    server.listen(PORT,function(){
        console.log("Server is runinng at port "+PORT);
    });
}

const SocketServer = require('ws').Server;
const wss = new SocketServer({ server });

let button_status = "off";   // Experiment 1: "on" / "off"
let brightness_status = "0"; // Experiment 2: 0 - 100
let blue_status = "blue_off";   // Experiment 3: "blue_on" / "blue_off"
let red_status = "red_off";     // Experiment 3: "red_on" / "red_off"
let green_status = "green_off"; // Experiment 3: "green_on" / "green_off"

wss.on('connection', function(ws){
	console.log('Client connected');
	
	// Send the current state of both experiments to the new client
	ws.send(button_status);
	ws.send(brightness_status);
	ws.send(blue_status);
	ws.send(red_status);
	ws.send(green_status);

	ws.on('message', function(msg){
		msg = msg.toString();
		console.log(msg);

		if(msg == "on" || msg == "off"){
			button_status = msg;
		}else if(msg == "blue_on" || msg == "blue_off"){
			blue_status = msg;
		}else if(msg == "red_on" || msg == "red_off"){
			red_status = msg;
		}else if(msg == "green_on" || msg == "green_off"){
			green_status = msg;
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

// Vercel takes the server from here
module.exports = server;