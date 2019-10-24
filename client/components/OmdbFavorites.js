import React, { Component } from 'react';

class OmdbFavorites extends Component {
    render() {
        let favorites = this.props.data.favorites,
            movie = this.props.data.movie;
        return (
            <ul className="contentFavorites">
                <li>Favorites</li>
                {
                    favorites &&
                    favorites.map((item, idx) => (
                        <li onClick={()=>this.props.actions.handleEdit(idx)} className={(movie && (movie.imdbID === item.imdbID))? 'active':''}>{item.title}</li>
                    ))
                }
            </ul>
        );
    }
}

export default OmdbFavorites;



