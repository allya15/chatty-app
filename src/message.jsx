import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
       const { type, username, content } = this.props.message;
        if (type === "incomingMessage") {
            return (
                <div className="message">
                <span className="message-username">{username}</span>
                    <span className="message-content">{content}</span>
                </div>
            )
        }
        return (
            <div className="message system">{content}</div>
        );
    }
}

export default Message;