const socket = io()

let name;
do{
    name = prompt("Please, tell your name?")
}while(!name)

let textarea = document.querySelector('#textarea')
let msg_container = document.querySelector('.message_container')
let send_button = document.querySelector('#send_btn')

textarea.addEventListener('keyup' , (e) => {
    if(e.key === 'Enter'){
        let m = String(e.target.value);
        if(m.length>1)
            sendMessage(m)
    }
})

// if some one presses the button
send_button.addEventListener('click', function() {
    let m = String(textarea.value);
        if(m.length>0)
            sendMessage(m)
})


function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }

    // append in chat section!
    appendMessage(msg , 'outgoing')
    scrollToBottom()
    textarea.value = '';

    // send to server
    socket.emit('message' , msg)
}

function appendMessage(msg , type){
    let mainDiv = document.createElement('Div')

    let className = type //outgoing message 
    // console.log(msg)
    mainDiv.classList.add(className,"message")   

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    msg_container.appendChild(mainDiv)
}

// Receive messages!

socket.on('message', (msg) => {
    // console.log(msg);
    appendMessage(msg , 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    msg_container.scrollTop = msg_container.scrollHeight; 
}