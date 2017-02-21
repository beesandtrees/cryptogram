import React, { Component } from 'react';

class AuthorList extends Component {
	render(){
		if (this.props.authors.length > 0) {
			return(
	      <ul className="authors">
	        {this.props.authors.map((author, i) => (
	            <li key={i} onClick={() => this.props.selectAuthor({author})}>{author}</li>
	        ))}
	      </ul>
  		);
	  }
		return(
			<span></span>
		);
	}
}

export default AuthorList;
