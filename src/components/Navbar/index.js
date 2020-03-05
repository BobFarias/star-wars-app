import React from 'react';

import {Nav, Navbar} from 'react-bootstrap';

import Logo from './../../assets/bg-web/logo.png';

import './Navbar.css';

import history from './../../services/history';

export default() => {

    function goHome(){
        history.push('/home');
    }

    return(
        <Navbar className="navbar-starwars" expand="lg">
            <Nav>
                <Nav.Link onClick={goHome}>Home</Nav.Link>
            </Nav>
            <Navbar.Brand className="navbar-logo-img">
                <img
                src={Logo}
                width="100%"
                className="d-inline-block align-top"
                alt="Star Wars logo"
                />
            </Navbar.Brand>
            <Nav>
                <Nav.Link onClick={goHome}>About</Nav.Link>
            </Nav>
      </Navbar>
    )
};