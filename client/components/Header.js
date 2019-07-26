import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <Link to="/">
                    <i className="fas fa-thumbs-up fa-5x"></i>
                    <h1>Hello, OMDB!</h1>
                </Link>
                <Nav/>
            </header>
        );
    }
}

export default Header;