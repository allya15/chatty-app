import React, { Component } from 'react';

function Nav(props){
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Trailer Park Talk</a>
                <p className="user-count">residents in the park{props.usersOnline > 1 ? ': ' + props.usersOnline : ': just you mate'}</p>
            </nav>
        )
    }

export default Nav;
