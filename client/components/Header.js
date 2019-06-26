import React, { Component } from 'react';
import { Nav } from '../components';

class Header extends Component {
	render() {
		return (
		  <header className="App-header">
			  <i className="fas fa-thumbs-up fa-5x"></i>
			  <h1>Hello, OMDB!</h1>
			  <Nav/>
		  </header>
		);
	}
}

export default Header;