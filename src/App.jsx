import React, {Component} from 'react';
import Nav from "./Nav.jsx"
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
      webSocket: new WebSocket('ws://0.0.0.0:3001');
      usersOnline: 0
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

      if (newUser && newUser !== oldUser){
        const type = 'Notification';
        const content = `${oldUser} has changed their name to ${newUser}`
        const newNotification = {type, content}
        socket.send(JSON.stringify(newNotifcation));
        this.setState({currentUser: {name: newUser, id: this.state.currentUser.id, color: this.state.currentUser.color}})
      }
      if (content) {
        const type = 'message';
        const id = this.state.messages.length + 1;
        const username = newUser || oldUser;
        const color = this.state.currentUser.color;
        const newMessage = {type, id, username, content, color};
        socket.send(JSON.stringify(newMessage));
        event.target.elements['text'].value = '';
      }
  }

  componentDidMount() {

    const {webSocket} = this.state;
    webSocket.onopen = (event) => {
      console.log('connected to webSocket');
    }

    webSocket.onmessage = (event) => {
      const {messages, currentUser} = this.state;
      const inMsg = JSON.parse(event.data)
      console.log(inMsg)

      if (inMsg.user) {
        this.setState({
          currentUser: {
            name: currentUser.name,
            id: inMsg.user.id,
            color: inMsg.user.color
          }})
          return;
      }
      if (inMsg.usersOnline) {
        this.setState({
          usersOnline: inMsg.usersOnline.
        })
      }
      console.log(messages)
      const messageArray = messages.concat(inMsg)
      console.log('MESSAGE ARRAY: ' message Array)
      this.setState({messages: messageArray})
    }
  }

  render() {
    return (
      <Fragment>
        <nav usersOnline={this.state.usersOnline}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.sendMessage}/>
      </Fragment>

    );
  }
}

export default App;

