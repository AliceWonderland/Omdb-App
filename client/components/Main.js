import React, { Component } from 'react';

class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			page:'',
			linkName:''
		};
	}

	render() {
		return (
		  <main>
			  <h1>HOME</h1>
			  <p>mov·ie
				/ˈmo͞ovē/

				a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture.
				synonyms:	film, picture, motion picture, feature, feature film; More
				a movie theater.

				plural noun: the movies
				"we decided to go to the movies"
				motion pictures generally or the motion-picture industry.

				plural noun: the movies
				"a lifelong love of the movies"
				
				synonyms:	the cinema, the pictures, the silver screen, the big screen; informalthe flicks
				"the growth of the movies as mass entertainment"
				</p>
		  </main>
		);
	}
}

export default Main;