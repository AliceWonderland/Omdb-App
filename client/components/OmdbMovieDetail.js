import React, { Component } from 'react';

class OmdbMovieDetail extends Component {
	render() {
        let movie = this.props.data;
		return (
            <div className="contentMovie">
                <img className="moviePoster" src={(movie.poster !== 'N/A') ? movie.poster : 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png'} />
                <div className="movieDetail">
                    <p>{movie.title}</p>
                    <p>{movie.year}</p>
                    <p>{movie.plot}</p>
                    <p>Rating: {movie.rating}
                        <span className="movieRating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </span>
                    </p>
                    <textarea name="comments" value={movie.comment} 
                        onChange={(e)=>this.props.actions.handleComment(e)}
                        onBlur={(e)=>this.props.actions.saveComment(e)}
                    />
                </div>
            </div>
		);
	}
}

export default OmdbMovieDetail;



