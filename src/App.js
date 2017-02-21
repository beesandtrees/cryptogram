import React, { Component } from 'react';
import $ from 'jquery';

import Riddle from './components/riddle';
import AuthorList from './components/authors';

// import {riddles} from './helpers/riddles';
import {authors} from './helpers/authors';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      authors: [],
      authorsClassList: ['authors'],
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
      this.setState({authorLookup: fullName});
      this.setState({authorName: combo});
      this.setState({authors: []});
      this.setState({play: true});
      this.selectQuote(fullName);
      // set state to alphabetized authors
  }

  selectQuote(author) {
    // for(var x = 0; x < riddles.length; x++) {
    //   if(riddles[x].author === author) {
    //     this.setState({riddle: riddles[x].riddle});
    //     return;
    //   }
    // }
    var _this = this;
    $.ajax({
      url: 'https://thundercomb-poetry-db-v1.p.mashape.com/author/' + author,
      type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
      data: {}, // Additional parameters here
      dataType: 'json',
      success: function(data) {
        _this.setState({riddle: data[Math.ceil(Math.random()*data.length-1)]});
      },
      error: function(err) {
        console.log(err.message);
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "ZqlZVIAPaEmsheL720EWgG23NjVap1n1cdJjsnYkpYU6POqo45"); // Enter here your Mashape key
      }
    });
  }

  resetApplication() {
    this.alphabetizeAuthors();
    this.setState({play: false});
    this.setState({authorLookup: ''});
    this.setState({authorName: 'Choose Author'});
    this.setState({riddle: ''});
  }

  render() {
    return <div>
      <h1>{this.state.authorName}</h1>
      <button onClick={() => this.resetApplication()} className="reset">RESET</button>
      <AuthorList authors={this.state.authors} selectAuthor={(author) => this.selectAuthor(author)} />
      <Riddle riddle={this.state.riddle} author={this.state.authorLookup} play={this.state.play} />
    </div>;
  }
}

export default App;
