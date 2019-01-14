import React, { Component } from 'react';

function navbar(props){

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="user-count">Users Online: {props.usersOnline}</p>
    </nav>
  );
}

export default Navbar;