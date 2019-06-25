import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Omdb extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			movie: {},
			searchResults: [],
			search: 'e.g. Guardians'
		};
	}

	componentDidMount() {
		// load movies into state
	}

	handleSearch(e){
		// if click is from sidebar
		if(typeof e === 'string'){
			this.setState({search:e},() => {
				this.getAPI();
			});
			return;
		}
		console.log('key',e.key, e, e.target, e.target.key, e.target.value);

		// if click is from search form
		if(e.key == 'Enter' || e.target.value==='Go'){
			this.getAPI();
		}
	}

	handleAdd(item){
		console.log(item);
		this.setState({movie: item});
		this.saveMovie(item);
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

	getAPI(){
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
			  }).then(res => res.json())
			  .then(response => console.log('Success:', JSON.stringify(response)))
			  .catch(error => console.error('Error:', error));


		})
		.catch((error) => {
			console.error('error', error);
		});


		
	}

	render() {
		let movies = this.state.movies,
			searchResults = this.state.searchResults;
		return (
		  <main className="omdb-main">
			  
			  {/* search */}
			  <form onSubmit={this.handleSubmit}>
			  	<h1>OMDB App</h1>
				  <input type="text" name="search" value={this.state.search} 
					onChange={(e)=>this.handleChange(e)}
					onKeyPress={(e)=>this.handleSearch(e)}
					onFocus={(e)=>this.handleFocus(e)} 
					onBlur={(e)=>this.handleBlur(e)}
					 />
			  </form>
			  {/* search results */}
			  <ul>
			  		{
						searchResults &&
						searchResults.map(item => (
							<li onClick={()=>this.handleAdd(item)}>
								<img src={item.Poster} />
								<p>{item.Title}</p>
							</li>
						  ))
					  }
				  
			  </ul>
			  {/* Movie */}
			  <div>Movie</div>
			  {/* favorites */}
			  <div>Favories</div>
		  </main>
		);
	}
}

export default Omdb;