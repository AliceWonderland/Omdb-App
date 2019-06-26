import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Omdb extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
			movie: null,
			searchResults: [],
			search: 'e.g. Guardians'
		};
	}

	componentDidMount() {
		this.getFavorites();
	}

	handleSearch(e){
		// if click is from sidebar
		if(typeof e === 'string'){
			this.setState({search:e},() => {
				this.searchOMDB();
			});
			return;
		}
		console.log('key',e.key, e, e.target, e.target.key, e.target.value);

		// if click is from search form
		if(e.key == 'Enter' || e.target.value==='Go'){
			this.searchOMDB();
		}
	}

	handleAdd(item){
		console.log(item);
		this.setState({movie: item});
		this.saveMovie(item);
	}

	handleEdit(idx){
		this.setState({movie: this.state.favorites[idx]})
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

	searchOMDB(){
		console.log('getapi',this.state.search);
		
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
			console.log('the data',responseJson)
			this.setState({favorites:responseJson});
		})
		.catch((error) => {
			console.error('error', error);
		});
	}

	saveMovie(data){
		console.log('save movie', data);

		let api=fetch('http://www.omdbapi.com/?i='+data.imdbID+'&plot=short&apikey=e5a8df1')
		.then((response) => response.json())
		.then((responseJson) => {

			console.log('the data',responseJson)
			let data = responseJson;
			let api=fetch('/api/movies/new', {
					method: 'POST', // or 'PUT'
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
			searchResults = this.state.searchResults;

		return (
			<main className="omdb-main">
				{/* search */}
				<form className="searchBar" onSubmit={this.handleSubmit}>
					<h1>OMDB App</h1>
					<input type="text" name="search" value={this.state.search} 
						onChange={(e)=>this.handleChange(e)}
						onKeyPress={(e)=>this.handleSearch(e)}
						onFocus={(e)=>this.handleFocus(e)} 
						onBlur={(e)=>this.handleBlur(e)}
					/>
				</form>
				{/* search results */}
				<ul className="searchResults">
						{
							searchResults &&
							searchResults.map(item => (
								<li onClick={()=>this.handleAdd(item)}>
									<img src={(item.Poster !== 'N/A') ? item.Poster : 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png'} />
									<p>{item.Title}</p>
								</li>
							))
						}
				</ul>
				<div className="contentBody">
						{/* Movie */}
						{movie ? (
							<div className="contentMovie">
								<img className="moviePoster" src={(movie.poster !== 'N/A') ? movie.poster : 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png'} />
								<div className="movieDetail">
									<p>{movie.title}</p>
									<p>Year: {movie.year}, Rating: {movie.rating}</p>
									<p>{movie.plot}</p>
									<p>{movie.comment}</p>
								</div>
							</div>
						) : (
							<p>Search OMDB for a Movie!</p>
						)}
						
						{/* favorites */}
						<ul className="contentFavorites">Favorites
							{
								favorites &&
								favorites.map((item, idx) => (
									<li onClick={()=>this.handleEdit(idx)}>{item.title}</li>
								))
							}
						</ul>
				</div>
		  	</main>
		);
	}
}

export default Omdb;