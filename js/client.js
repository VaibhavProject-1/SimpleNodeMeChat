const socket = io('http://localhost:8000',{transports:['websocket']})

//DOM Elements in respective variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//Audio playing on events
var audio = new Audio('tone.mp3');

//Function to append event info to message container
const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){
    audio.play();
    }
}


//Asking new user for their name
const name = prompt("Enter your Name to join");
socket.emit('new-user-joined',name);

//Listening for incoming messages of new arrivals
socket.on('user-joined',name=>{
    append(`${name} has joined the chat`,'right');
});

//Receiving messages and handling with server
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
});

//Invoked when any user leaves
socket.on('left',name=>{
    append(`${name} has left the chat`,'right');
});


//Submit form and send message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})