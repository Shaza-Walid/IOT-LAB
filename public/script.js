// ======================================
// WebSocket Connection
// ======================================
var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);


// ======================================
// Experiment 1: ON / OFF
// ======================================
var bulbOne = document.getElementById("bulbOne");
var powerButton = document.getElementById("powerButton");
var powerStatus = document.getElementById("powerStatus");

// Button click
powerButton.onclick = function(){
    if(this.style.backgroundColor == "red"){
        ws.send("on");        // Send ON command to the server
    }else{
        ws.send("off");       // Send OFF command to the server
    }
};


// Receive message from server
ws.onmessage = function(event){
    var msg = event.data;

    // ==================================
    // Experiment 1
    // ==================================
    if(msg == "on"){
        bulbOne.style.backgroundColor = "#facc15";
        bulbOne.style.boxShadow = "0 0 25px #facc15, 0 0 60px rgba(250, 204, 21, 0.5)";
        powerButton.style.backgroundColor = "green";
        powerButton.textContent = "Turn Off";
        powerStatus.textContent = "Light is ON";
    }else if(msg == "off"){
        bulbOne.style.backgroundColor = "#374151";
        bulbOne.style.boxShadow = "none";
        powerButton.style.backgroundColor = "red";
        powerButton.textContent = "Turn On";
        powerStatus.textContent = "Light is OFF";
    }

    // ==================================
    // Experiment 2
    // ==================================
    else{
        var value = Number(msg);        // Convert the received message to a number
        // Check if the message is a brightness value
        if(value >= 0 && value <= 100){
            brightness.value = value;            // Move the slider to the received value
            brightnessValue.textContent = value;            // Show brightness value
            var intensity = value / 100;            // Convert 0 - 100 to 0 - 1
            bulbTwo.style.backgroundColor = `rgba(250, 204, 21, ${intensity})`;            // Change bulb brightness
            var glow = value / 2;            // Change glow based on brightness
            bulbTwo.style.boxShadow = `0 0 ${glow}px rgba(250, 204, 21, ${intensity})`;
        }
    }
};

// ======================================
// Experiment 2: Brightness
// ======================================
var bulbTwo = document.getElementById("bulbTwo");
var brightness = document.getElementById("brightness");
var brightnessValue = document.getElementById("brightnessValue");
// Slider change
brightness.oninput = function(){
    var value = this.value;    // Get the current slider value
    ws.send(value);    // Send brightness value to the server
};


// ======================================
// WebSocket opened & closed functions
// ======================================
ws.onopen = function(){
    console.log("Connected to server");
};
ws.onclose = function(){
    console.log("Disconnected from server!");
};