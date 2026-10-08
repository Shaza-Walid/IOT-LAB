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
    if(this.style.backgroundColor == "#006d77"){
        ws.send("on");        // Send ON command to the server
    }else{
        ws.send("off");       // Send OFF command to the server
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
// Experiment 3: RGB Lights
// ======================================

// Blue Light
var blueBulb = document.getElementById("blueBulb");
var blueButton = document.getElementById("blueButton");
var blueStatus = document.getElementById("blueStatus");
blueButton.onclick = function(){
    if(this.style.backgroundColor == "#006d77"){
        ws.send("blue_on");        // Send Blue ON command
    }else{
        ws.send("blue_off");        // Send Blue OFF command
    }
};

// Red Light
var redBulb = document.getElementById("redBulb");
var redButton = document.getElementById("redButton");
var redStatus = document.getElementById("redStatus");
redButton.onclick = function(){
    if(this.style.backgroundColor == "#006d77"){
        ws.send("red_on");        // Send Red ON command
    }else{
        ws.send("red_off");        // Send Red OFF command
    }
};

// Green Light
var greenBulb = document.getElementById("greenBulb");
var greenButton = document.getElementById("greenButton");
var greenStatus = document.getElementById("greenStatus");
greenButton.onclick = function(){
    if (this.style.backgroundColor == "#006d77") {
        ws.send("green_on");        // Send Green ON command
    }else{
        ws.send("green_off");        // Send Green OFF command
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
        powerButton.style.backgroundColor = "#FFDDD2";
        powerButton.textContent = "Turn Off";
        powerStatus.textContent = "Light is ON";
    }else if(msg == "off"){
        bulbOne.style.backgroundColor = "#83C5BE";
        bulbOne.style.boxShadow = "none";
        powerButton.style.backgroundColor = "#006d77";
        powerButton.textContent = "Turn On";
        powerStatus.textContent = "Light is OFF";
    }

    // ==================================
    // Experiment 2
    // ==================================
    else if(!isNaN(msg)){        // Check if the message is a number    
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
    // ================================== 
    // Experiment 3: Blue Light 
    // ================================== 
    else if(msg == "blue_on"){
        blueBulb.style.backgroundColor = "#3b82f6";
        blueBulb.style.boxShadow = "0 0 25px #3b82f6, 0 0 60px rgba(59, 130, 246, 0.5)";
        blueButton.style.backgroundColor = "#FFDDD2";
        blueButton.textContent = "Turn Off";
        blueStatus.textContent = "Blue Light is ON";
    }else if(msg == "blue_off"){
        blueBulb.style.backgroundColor = "#83C5BE";
        blueBulb.style.boxShadow = "none";
        blueButton.style.backgroundColor = "#006d77";
        blueButton.textContent = "Turn On";
        blueStatus.textContent = "Blue Light is OFF";
    }
    // ==================================
    // Experiment 3: Red Light
    // ==================================
    else if(msg == "red_on"){
        redBulb.style.backgroundColor = "#ef4444";
        redBulb.style.boxShadow = "0 0 25px #ef4444, 0 0 60px rgba(239, 68, 68, 0.5)";
        redButton.style.backgroundColor = "#FFDDD2";
        redButton.textContent = "Turn Off";
        redStatus.textContent = "Red Light is ON";
    }else if(msg == "red_off"){
        redBulb.style.backgroundColor = "#83C5BE";
        redBulb.style.boxShadow = "none";
        redButton.style.backgroundColor = "#006d77";
        redButton.textContent = "Turn On";
        redStatus.textContent = "Red Light is OFF";
    }
    // ==================================
    // Experiment 3: Green Light
    // ==================================
    else if(msg == "green_on"){
        greenBulb.style.backgroundColor = "#22c55e";
        greenBulb.style.boxShadow = "0 0 25px #22c55e, 0 0 60px rgba(34, 197, 94, 0.5)";
        greenButton.style.backgroundColor = "#FFDDD2";
        greenButton.textContent = "Turn Off";
        greenStatus.textContent = "Green Light is ON";
    }else if(msg == "green_off"){
        greenBulb.style.backgroundColor = "#83C5BE";
        greenBulb.style.boxShadow = "none";
        greenButton.style.backgroundColor = "#006d77";
        greenButton.textContent = "Turn On";
        greenStatus.textContent = "Green Light is OFF";
    }
    // ==================================
    // Unknown Message
    // ==================================
    else{
        console.log("Unknown message from server:", msg);
    }
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