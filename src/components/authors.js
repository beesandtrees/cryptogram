class Authors extends React.Component {
	render(){
  		return(
      <ul className="authors">
        {this.props.authors.map((author, i) => (
            <li key={i} onClick={() => this.selectAuthor({author})}>{author}</li>
        ))}
      </ul>
  		);
	}
}
