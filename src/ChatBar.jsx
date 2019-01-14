import React, {Component} from 'react';

class ChatBar extends Component {
    render() {
        return (
            <form className="chatbar" onKeyPress={this.props.addMessage}>
                <input name="username" className="chatbar-username" value={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
                <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </form>
        )
    }
}

export default ChatBar;