import React, { Component } from 'react';

class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			text: "mov·ie /ˈmo͞ovē/ a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture. synonyms:	film, picture, motion picture, feature, feature film; More a movie theater.",
            prompt: "Hit the above Search to find your favorite movie!"
		};
	}

	render() {
		return (
		  <main>
			  <h1>HOME</h1>
			  <p>{this.state.text}</p>
              <p>{this.state.prompt}</p>
		  </main>
		);
	}
}

export default Main;