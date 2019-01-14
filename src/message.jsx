import React, { Component } from 'react';

function Message(props) {

    const {content, color, username, type, imgs} = props.data

    function buildImgs(imgArray) {
        const renderArray = []
        imgArray.forEach((img) => {
            renderArray.push(<img className='message-image' alt='user-image' src={img}/>)
        })
        return renderArray;
    }

    switch(type) {
        case 'message':
            return (
                <div className="message">
                <span className="message-username" style={{color: color}}>{username}</span>
                <span className="message-content">{content}
                {buildImgs(imgs)}
                </span>
                </div>
            )
            break;
        case 'notification':
            return (
                <div className="notification">
                <span className="notification-content">{content}</span>
                </div>
            )
            break;
    }
    return (
        <div className="notification">
        <span className="notification-content">unknown message from server</span>
        </div>
    )
}

export default Message;