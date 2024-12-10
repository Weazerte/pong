 
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connecté');

  // Gérer les messages envoyés par le client
  socket.on('message', (message) => {
    console.log('Message reçu :', message);

    // Réponse au client
    socket.send(`${message}`);
  });

  // Gérer la déconnexion
  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});

console.log('Serveur WebSocket démarré sur ws://localhost:8080');