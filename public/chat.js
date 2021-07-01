// =============MAKE CONNECTION===================
var socket = io.connect("http://localhost:3000");

// ===============QUERY DOM===============
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("btn");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

message.addEventListener("keypress", function(){
    socket.emit("typing",handle.value)
});

// ===========EMIT EVENT=========================
btn.addEventListener("click", function(){
    // console.log("hello")
    socket.emit("chat",{
        message: message.value,
        handle: handle.value
    })
});

// ===========================LISTEN FOR EVENTS====================
socket.on("chat", function(data){
    feedback.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + ":</strong> " + data.message +"</p>"
});

socket.on("typing", function(data){
    feedback.innerHTML = "<p><em>" + data +" is typing..." +"</em></p>"
});