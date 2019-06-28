import React, {Component} from 'react';
import { OmdbFavorites, OmdbMovieDetail, OmdbSearch, OmdbSearchResults } from '../components';

class Omdb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            movie: null,
            searchResults: [],
            stars: [1,2,3,4,5],
            search: 'e.g. Guardians of the Galaxy'
        };
        //bind to maintin 'this' in children
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.saveRating = this.saveRating.bind(this);
    }

	componentDidMount() {	
		this.getFavorites();
	}

	handleSearch(e){
		console.log('key',e.key, e, e.target, e.target.key, e.target.value);
		if(e.key == 'Enter' || e.target.value==='Go'){
			e.target.blur();
			this.searchOMDB();
		}
	}

	handleChange(e){
		console.log(e.target.value)
		this.setState({search: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
	}

	handleFocus(e){
		e.target.value='';
	}

	handleBlur(e){
		e.target.value=this.state.search;
	}

	handleAdd(item){
		this.setState({movie: item});
		this.saveMovie(item);
	}

	handleEdit(idx){
		this.setState({movie: this.state.favorites[idx]})
	}

	handleComment(e){
		this.setState({movie: {...this.state.movie, comment:e.target.value}});
	}

	saveComment(e){
        this.setState({
            movie: {...this.state.movie, comment:e.target.value}
        }, () => {
            let api=fetch('/api/movies/edit', {
                    method: 'PUT',
                    body: JSON.stringify(this.state.movie), // data can be `string` or {object}!
                    headers:{
                    'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    console.log('res',response);
                    console.log('Success:', JSON.stringify(response));
                    console.log('state',this.state.movie);
                    this.getFavorites();
                })
                .catch(error => console.error('Error:', error));
        });
	}

    saveRating(stars){
        stars=stars;
        this.setState({
            movie: {...this.state.movie, rating:stars}
        }, () => {
            let api=fetch('/api/movies/edit', {
                    method: 'PUT',
                    body: JSON.stringify(this.state.movie), // data can be `string` or {object}!
                    headers:{
                    'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    console.log('res',response);
                    console.log('Success:', JSON.stringify(response));
                    console.log('state',this.state.movie);
                    this.getFavorites();
                })
                .catch(error => console.error('Error:', error));
        });
    }

	searchOMDB(){
		let api=fetch('http://www.omdbapi.com/?s='+this.state.search+'&type=movie&page=1&apikey=e5a8df1')
			.then((response) => response.json())
			.then((responseJson) => {
				console.log('the data',responseJson.Search)
				this.setState({searchResults: responseJson.Search});
			})
			.catch((error) => {
				console.error('error', error);
			});

		// http://www.omdbapi.com/?i=tt3896198&apikey=e5a8df1
		// http://www.omdbapi.com/?t=space&plot=short&apikey=e5a8df1
		// http://www.omdbapi.com/?s=space&type=movie&page=1&apikey=e5a8df1 max 10 results
	}

	getFavorites(){
		let api=fetch('/api/movies')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({favorites:responseJson});
            })
            .catch((error) => {
                console.error('error', error);
            });
	}

	saveMovie(data){
		let api=fetch('http://www.omdbapi.com/?i='+data.imdbID+'&plot=short&apikey=e5a8df1')
            .then((response) => response.json())
            .then((responseJson) => {

                let data = responseJson;
                let api=fetch('/api/movies/new', {
                        method: 'POST',
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers:{
                        'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(response => {
                        console.log('res',response);
                        console.log('Success:', JSON.stringify(response));
                        this.setState({movie:response});
                        console.log('state',this.state.movie);
                        this.getFavorites();
                    })
                    .catch(error => console.error('Error:', error));
                    
            })
            .catch((error) => {
                console.error('error', error);
            });
	}

	render() {
		let favorites = this.state.favorites,
			movie = this.state.movie,
            stars = this.state.stars,
			searchResults = this.state.searchResults;

		return (
			<main className="omdb-main">

                <OmdbSearch 
                    value={this.state.search} 
                    actions={{
                        handleSubmit: (e) => this.handleSubmit(e),
                        handleChange: (e) => this.handleChange(e),
                        handleFocus: (e) => this.handleFocus(e),
                        handleBlur: (e) => this.handleBlur(e),
                        handleSearch: (e) => this.handleSearch(e)
                    }}
                />

                <OmdbSearchResults data={searchResults} actions={{handleAdd: this.handleAdd}} />

				<div className="contentBody">
						{movie ? (
                            <OmdbMovieDetail data={{movie, stars}} actions={{
                                handleComment: this.handleComment, 
                                saveComment: this.saveComment,
                                saveRating: this.saveRating
                            }} />
						) : (
							<p>Search OMDB for a Movie!</p>
						)}
						
                        <OmdbFavorites data={{favorites, movie}} actions={{handleEdit: this.handleEdit}} />
				</div>
		  	</main>
		);
	}
}

export default Omdb;