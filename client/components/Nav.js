import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	constructor(props){
		super(props);
		this.state={
			page:'',
			linkName:''
		};
		this.handleClick=this.handleClick.bind(this);
	}

	componentDidMount(){

	}

	handleClick(e){

	}

	render() {
		return (
		  <nav>
			  <Link to="/omdb">Home <i className="fas fa-arrow-right" aria-hidden="true"></i></Link>
			  <a href="https://github.com/AliceWonderland/Omdb-App" target="_blank">GitHub <i className="fas fa-arrow-right" aria-hidden="true"></i></a>
			  <a href="http://www.omdbapi.com/" target="_blank">OMDB <i className="fas fa-arrow-right" aria-hidden="true"></i></a>
		  </nav>
		);
	}
}

export default Nav;