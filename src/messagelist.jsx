import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList(props){
      const messageArray = []
      props.messages.forEach((message) => {
          messageArray.push(<Message data={message} key={message.id}/>)
      })
      return (

          <main className="messages">
              {messageArray}
          </main>
      )
}

export default MessageList;