const socket = io("http://localhost:3000")
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

const name = prompt("what is your name?")
appendMessage("you joined")
socket.emit("new-user", name)

//whenever the "chat-message" event is received
//send the users message with their name attached to it
socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", name => {
    appendMessage(`${name} connected`)
})

socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected`)
})

//whenever the user submites their message
//save their message into a variable and send it to the server with thier name attatched
messageForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageInput.value = ""
})

function appendMessage (message){
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}