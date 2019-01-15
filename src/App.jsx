import React, {Component, Fragment} from 'react';
import Nav from './Nav.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      messages: [],
      currentUser: {name: 'Ally', color: '', id: ''},
      webSocket: new WebSocket('ws://0.0.0.0:3002'),
      usersOnline: 0,
    }
    this.scrollRef = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = (event) => {
      event.preventDefault()
      const newUser = event.target.elements['username'].value
      const oldUser = this.state.currentUser.name
      const socket = this.state.webSocket
      const content = event.target.elements['text'].value

      if (newUser && newUser !== oldUser){
        const type = 'incomingNotification';
        const content = `${oldUser} has changed their name to ${newUser}`
        const newNotification = {type, content}
        socket.send(JSON.stringify(newNotification))
        this.setState({currentUser: {name: newUser, id: this.state.currentUser.id, color: this.state.currentUser.color}})
      }

      if (content) {
        const type = 'postMessage';
        const id = this.state.messages.length + 1;
        const username = newUser || oldUser;
        const color = this.state.currentUser.color;
        const newMessage = {type, id, username, content, color};
        socket.send(JSON.stringify(newMessage));
        event.target.elements['text'].value = '';
      }
  }
  componentDidUpdate() {
    this.scrollRef.current.scrollIntoView({behavior: "instant", inline: "nearest"});
    }

  componentDidMount() {


    this.state.webSocket.onopen = (event) => {
      console.log('connected to webSocket');
    }

    this.state.webSocket.onmessage = (event) => {
      const inMsg = JSON.parse(event.data)
      console.log(inMsg)

      if (inMsg.user) {
        this.setState({
          currentUser: {
            name: this.state.currentUser.name,
            id: inMsg.user.id,
            color: inMsg.user.color
        }})
        return;
      }

      if (inMsg.usersOnline) {
        this.setState({
          usersOnline: inMsg.usersOnline,
        })
      }
      const messageArray = this.state.messages.concat(inMsg)
      this.setState({messages: messageArray})
    }
  }

  render() {
    return (
      <Fragment>
        <Nav usersOnline={this.state.usersOnline}/>
        <MessageList messages={this.state.messages}/>
        <div ref={this.scrollRef}/>
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.sendMessage}/>
      </Fragment>
    );
  };
};
export default App;