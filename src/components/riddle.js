import React, { Component } from 'react';
import {alphabet} from '../helpers/alphabet';

class Riddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riddle: '',
      vanillaRiddle: ''
    };
  }

  componentDidUpdate() {
    if(this.state.riddle === '' && this.state.riddle !== this.props.riddle) {
      this.parseRiddle();
      this.setState({vanillaRiddle: this.props.riddle});
    }
  }

  shuffleAlphabet() {
    // create an alphabet array with real letters as keys and new letters as values
    // use this to create
  }

  replaceLetter(letter) {
    let allSame = document.getElementsByClassName(letter);
    console.log(letter, this.props.riddle, this.state.vanillaRiddle);
  }

  splitRiddle() {
    let splitRiddle = this.props.riddle.toLowerCase().split(" ");
    let riddleHTML = [];
    for(var x = 0; x < splitRiddle.length; x++) {
      let doubledip = splitRiddle[x].split("");
      let newWord = [];
      for(var y = 0; y < doubledip.length; y++) {
        let current = doubledip[y];
        newWord.push(<span onClick={() => this.replaceLetter(current)} key={y} data-letter={current} className={current}>{current}</span>);
      }
      riddleHTML.push(<div key={x} className="word">{newWord}</div>);
    }
    this.setState({riddle: riddleHTML});
  }

  parseRiddle() {
    this.splitRiddle();
  }

  render() {
    if(this.props.riddle === '') {
      return <div />
    }
    return  <div className="riddle">
      <h2>Decrypt Quote Section</h2>
      {this.state.riddle}
    </div>;
  }
}

export default Riddle;
