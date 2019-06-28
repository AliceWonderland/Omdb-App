import React, { Component } from 'react';

class OmdbSearch extends Component {
	render() {
		return (
            <form className="searchBar" onSubmit={this.props.actions.handleSubmit}>
                <input type="text" name="search" value={this.props.value} 
                    onChange={(e)=>this.props.actions.handleChange(e)}
                    onKeyPress={(e)=>this.props.actions.handleSearch(e)}
                    onFocus={(e)=>this.props.actions.handleFocus(e)} 
                    onBlur={(e)=>this.props.actions.handleBlur(e)}
                />
            </form>
		);
	}
}

export default OmdbSearch;