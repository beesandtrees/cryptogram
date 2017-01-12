import React, { Component } from 'react';

import Riddle from './components/riddle';

import {riddles} from './helpers/riddles';
import {authors} from './helpers/authors';
import {alphabet} from './helpers/alphabet';

class Alphabet extends Component {
  render() {
    if(this.props.play === false) {
      return <div />
    }
    return <div className="with">
        <h2>Replace Selected With:</h2>
        {alphabet.map((letter, i) => (
            <span key={letter}>{letter}</span>
        ))}
      </div>
    }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      authors: [],
      authorName: 'Choose Author',
      authorLookup: '',
      riddle: ''
    };
  }

  componentDidMount() {
    this.alphabetizeAuthors();
  }

  alphabetizeAuthors() {
    let originalList = authors;
    let newAuthorList = [];

    // loop through originalList and add to new list
    // then sort the new list alphabetically
    for (var i = 0; i < originalList.length; i++) {
      var author = originalList[i];
    // // first reverse to last name first
      // turn name into an array
      // reorder the array to make the last name first
      var full = author.split(" ");
      var lastName = full.splice(-1,1);
      var firstName = full.join(" ");

      // put the array back together as a string
      var fullName = lastName[0] + ", " + firstName;

      newAuthorList.push(fullName);
    }

    // // then sort new list
    newAuthorList.sort();

    // set state to alphabetized authors
    this.setState({
      authors: newAuthorList
    });
  }

  selectAuthor(selected) {
      var full = selected["author"].split(" ");
      var lastName = full.splice(0,1).toString().slice(0, -1);
      var firstName = full.join(" ");
      var fullName = firstName + " " + lastName;
      var combo = "Author - " + fullName;
      this.setState({authorLookup: lastName});
      this.setState({authorName: combo});
      this.setState({authors: []});
      this.setState({play: true});
      this.selectQuote(fullName);
      // set state to alphabetized authors
  }

  selectQuote(author) {
    for(var x = 0; x < riddles.length; x++) {
      if(riddles[x].author === author) {
        this.setState({riddle: riddles[x].riddle});
        return;
      }
    }
  }

  resetLetter() {

  }

  resetApplication() {
    this.alphabetizeAuthors();
    this.setState({play: false});
  }

  render() {
    return <div>
      <h1>{this.state.authorName}</h1>
      <ul className="authors">
        {this.state.authors.map((author, i) => (
            <li key={i} onClick={() => this.selectAuthor({author})}>{author}</li>
        ))}
      </ul>
      <Riddle riddle={this.state.riddle} />
      <Alphabet play={this.state.play} />
    </div>;
  }
}

export default App;
