import React, { Component } from 'react';

class OmdbMovieDetail extends Component {
    render() {
        let movie = this.props.data.movie,
            stars = this.props.data.stars;
        return (
            <div className="contentMovie">
                <img className="moviePoster" src={(movie.poster !== 'N/A') ? movie.poster : 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png'} />
                <div className="movieDetail">
                    <p>{movie.title} <i className="fa fa-trash-alt" onClick={()=>this.props.actions.handleDelete(movie.imdbID)}></i></p>
                    <p>{movie.year}</p>
                    <p>{movie.plot}</p>
                    <p>Rating:
                        <span className="movieRating">
                        {
                            stars.map((ele,idx) => (
                                <i value={idx+1} className={(movie.rating>0 && idx<movie.rating) ? 'fas fa-star active':'fas fa-star'} onClick={()=>this.props.actions.saveRating(idx+1)}></i>
                            ))
                        }
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



