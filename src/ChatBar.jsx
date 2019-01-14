import React, {Component} from 'react';

function ChatBar(props){
    return (
        <form onSubmit={props.onSubmit}>
            <footer className="chatbar">
                <input className="chatbar-username" placeholder={props.currentUser.name} name='username'></input>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" name='text'></input>
                <button type="submit">test</button>
            </footer>
        </form>
    )
}

export default ChatBar;