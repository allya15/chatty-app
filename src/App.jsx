import React, {Component} from 'react';

require('../styles/application.scss');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'},
        messages : [
          {
            type: 'incomingMessage',
            content: 'I won\'t be impressed with technology until I can download food.',
            username: 'Anonymous1'
          },
          {
            type: 'incomingNotification',
            content: 'Anonymous1 changed their name to nomnom',
          },
          {
            type: 'incomingMessage',
            content: 'I wouldn\'t want to download Kraft Dinner. I\'d be scared of cheese packet loss.',
            username: 'Anonymous2'
          },
          {
            type: 'incomingMessage',
            content: '...',
            username: 'nomnom'
          },
          {
            type: 'incomingMessage',
            content: 'I\'d love to download a fried egg, but I\'m afraid encryption would scramble it',
            username: 'Anonymous2'
          },
          {
            type: 'incomingMessage',
            content: 'This isn\'t funny. You\'re not funny',
            username: 'nomnom'
          },
          {
            type: 'incomingNotification',
            content: 'Anonymous2 changed their name to NotFunny',
          }
        ]
      };
      this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {

      window.scrollTo({ bottom: 0, behavior: 'smooth' });
      console.log('componentDidMount <App />');
      setTimeout(() => {

        console.log('Simulating incoming message');

        const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
        const messages = this.state.messages.concat(newMessage)

        this.setState({messages: messages})
      }, 3000);
    }



  addMessage(message, name) {
    let newMessageItem = {

      content: message,
      username: name
    }
    const newMessages = this.state.messages.concat(newMessageItem);
    this.setState({ messages: newMessages });
  }

  render() {
    return (

      <div>
        {}
        <MessageList messages = {this.state.messages} />
        <ChatBar
        currentUser={this.state.currentUser}
        addMessage={this.addMessage}
        />
      </div>
    );
  }
}