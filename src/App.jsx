import React, {Component} from 'react';

require('../styles/application.scss');

const wss = new WebSocket(`ws://${window.location.hostname}:3001`);

import Navbar from "./Navbar.jsx"
import Message from "./Message.jsx"
import Chatbar from "./Chatbar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
  constructor(props);
    super(props){
    this.state = {
      loading: true,
      messages: [],
      currentUser: {name: 'Bob'}
      webSocket: new WebSocket('ws://0.0.0.0:3002');
    }
    this.addMessage = this.addMessage.bind(this);
  }


  addMessage(event) {
    event.preventDefault();
    //console.log(event);
    const newUser = event.target.elements['username'].value;
    const oldUser = event.state.currentUser.name;
    const socket = this.state.webSocket;

    const content = event.target.elements['text'].value;

    const newMessage = {id, username, content};
      if (newUser && newUser !== oldUser){
        const type = 'postNotification';
        const content = `${oldUser} has changed their name to ${newUser}`
        const newNotification = {type, content}
        socket.send(JSON.stringify(newNotifcation));
        this.setState({currentUser: {name: newUser}})
      }
      if (content) {
        const type = 'postMessage';
        const id = this.state.messages.length + 1;
        const newMessage = {type, id, username, content}
        socket.send(JSON.stringify(newMessage));
        event.target.elements['text'].value = '';
      }
  }

  componentDidMount() {
    this.state.webSocket.onopen = (event) => {
      console.log('connected to webSocket');
    }

    this.state.webSocket.onmessage = (event) => {
      const inMsg = JSON.parse(event.data)
      const messageArray = this.state.messages.concat(inMsg)
      this.setState({messages: messageArray})
    }
  }

  render() {
    return (
      <Fragment>
        <nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.sendMessage}/>
      </Fragment>

    );
  }
}

export default App;

