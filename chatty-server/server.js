const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4')
const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server and listen for connections
const wss = new SocketServer.Server({ server });
wss.on('connection', (ws) => {

  //On client connection, assign and sends a user ID and Color to that client
  console.log('Client connected');
  ws.send(JSON.stringify({
    user: {
      id: uuidv4(),
      color: "#" + Math.random().toString(16).slice(2, 8)
    }}))

  //On client connection, notify all clients of new total connections
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify({
        type: 'notification',
        id: uuidv4(),
        usersOnline: wss.clients.size,
        content: 'a new resident has has entered the park'
      }))
    }
  });

  //On incoming message, server parses and broadcasts message to all clients
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data)
    message.id = uuidv4();

    function removeURL(string) {
      const messageArray = string.split(' ');
      const imageReg = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig)
      const newMessageArray = [];
      messageArray.forEach((word) => {
          if(!imageReg.test(word)){
              newMessageArray.push(word)
          }
      })
      string = newMessageArray.join(' ')
      return string;
    }

    function imageURL(string) {
      const messageArray = string.split(' ');
      const imageReg = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig)
      const urlArray = [];
      messageArray.forEach((word) => {
          if(imageReg.test(word)){
              urlArray.push(word)
          }
      })
      return urlArray;
    }


    message.imgs = imageURL(message.content)
    message.content = removeURL(message.content)

    data = JSON.stringify(message)
    wss.clients.forEach(function each(client) {
        if (client.readyState === SocketServer.OPEN) {
          client.send(data);
        }
      });
    });


  ws.on('close', (ws) => {
    console.log('Client disconnected')
    //On client close, server notifys all clients of new total connections
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify({
          type: 'notification',
          id: uuidv4(),
          usersOnline: wss.clients.size,
          content: 'a resident has left the park'
        }))
      }
    });
  }); //end of CLOSE

});