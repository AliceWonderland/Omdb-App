import React, { Component } from 'react';

class OmdbSearchResults extends Component {
	render() {
        let searchResults = this.props.data;
		return (
            <ul className="searchResults">
            {
                searchResults &&
                searchResults.map(item => (
                    <li value={item.imdbID} onClick={()=>this.props.actions.handleAdd(item)}>
                        <img src={(item.Poster !== 'N/A') ? item.Poster : 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png'} />
                        <p>{item.Title}</p>
                    </li>
                ))
            }
            </ul>   
		);
	}
}

export default OmdbSearchResults;