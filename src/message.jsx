import React, {Component} from 'react';

function Message(props){
  if (props.data.type === 'postMessage') {
    return (
        <div className="message">
        <span className="message-username">{props.data.username}</span>
        <span className="message-content">{props.data.content}</span>
        </div>
    )
  } else if (props.data.type === 'postNotification') {
          return (
              <div className="notification">
              <span className="notification-content">{props.data.content}</span>
              </div>
          )
      } else {
          return (
              <div className="notification">
              <span className="notification-content">Unknown notification</span>
              </div>
        )
    }
}


export default Message;