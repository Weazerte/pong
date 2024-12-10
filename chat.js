const socket = new WebSocket('ws://localhost:8080/');
if (socket.readyState == WebSocket.OPEN){
    console.log('Serveur WebSocket démarré sur ws://localhost:8080');
}

const messagesDiv = document.getElementById("messages");

socket.onopen = () => {console.log("Connected to the server!");};
socket.onmessage = (event) => {console.log("message received", event.data);
    const message = event.data;

    // Crée un nouvel élément pour afficher le message
    const messageElement = document.createElement("p");
    messageElement.textContent = `user : ${message}`;

    // Ajoute le message à la zone des messages
    messagesDiv.appendChild(messageElement);
};
socket.onclose = () => {console.log("Connection closed");};

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message && socket.readyState == WebSocket.OPEN){
        socket.send(message);
        messageInput.value = "";
    } else {
        console.log("no message or no connexion with WebSocket server");
    }

});

messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter"){
        sendButton.click();
    }
});