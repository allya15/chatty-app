const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3002;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');
  const generateUser = {user: {id: uuidv4(), color: "#" + Math.random().toString(16).slice(2, 8)}}
  ws.send(JSON.stringify(generateUser))

  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify({
        type: 'incomingNotification',
        id: uuidv4(),
        usersOnline: wss.clients.size,
        content: 'a new user has joined the chat'
      }))
    }
  });

  ws.on('message', function incoming(data) {
    const parsed = JSON.parse(data)
    parsed.id = uuidv4();
    data = JSON.stringify(parsed)
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
        if (client.readyState === SocketServer.OPEN) {
          client.send(data);
        }
      });
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', (ws) => {
      console.log('Client disconnected')
      wss.clients.forEach(function each(client) {
        if (client.readyState === SocketServer.OPEN) {
          client.send(JSON.stringify({
            type: 'incomingNotification',
            id: uuidv4(),
            usersOnline: wss.clients.size,
            content: 'a user has left the chat'
          }))
        }
      });



    });
})