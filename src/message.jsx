import React, { Component } from 'react';

function Message(props) {
    if (props.data.type === 'postMessage') {

        function imageURL(string) {
            const messageString = string;
            const start = messageString.search(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig);
            const end = messageString.search(/(?:jpg|gif|png)\b/ig) + 3;
            const imageURL = messageString.slice(start, end)
            console.log(imageURL)
            return imageURL
        }

        return (
            <div className="message">
            <span className="message-username" style={{color: props.data.color}}>{props.data.username}</span>
            <span className="message-content">{props.data.content}
                <img className='message-image' src={imageURL(props.data.content)}/>
            </span>
            </div>
        )

    } else if (props.data.type === 'incomingNotification') {
        return (
            <div className="notification">
            <span className="notification-content">{props.data.content}</span>
            </div>
        )
    } else {
        return (
            <div className="notification">
            <span className="notification-content">unknown notification</span>
            </div>
        )
    }
}

export default Message;