import React, { Component } from 'react';

function Nav(props){
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className="user-count">Users online: {props.usersOnline > 1 ? ': ' + props.usersOnline : ': Only you'}</p>
            </nav>
        )
    }

export default Nav;