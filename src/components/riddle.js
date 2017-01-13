import React, { Component } from 'react';
import {alphabet} from '../helpers/alphabet';

class Riddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riddle: '',
      vanillaRiddle: '',
      sortedAlpha: this.shuffleAlphabet()
    };
  }

  componentDidUpdate() {
    if(this.state.riddle === '' && this.state.riddle !== this.props.riddle) {
      this.renderRiddle();
      this.setState({vanillaRiddle: this.props.riddle});
    }
  }

  shuffleAlphabet() {
    // create an alphabet array with real letters as keys and new letters as values
    // use this to create
    let doubleBet = alphabet.slice(0);
    let alphaLong = doubleBet.length;
    let sorted = [];
    for (var i = 0; i < alphaLong; i++) {
      // get a random number from the new array
      var random = Math.floor(Math.random() * doubleBet.length);

      if(alphabet[i] === doubleBet[random]) {
        random = Math.floor(Math.random() * doubleBet.length);
      }

      // remove the random letter from the new array
      var letter = doubleBet.splice(random, 1)[0];

      // push the letter into a new array
      sorted.push(letter);
    }
    return sorted;
  }

  selectLetter(letter) {
    // this.props.riddle === this.state.vanillaRiddle

    // if this letter has already been switched we will
    // want to instead turn it off and allow it to be played again
    // to do so we must also unstrike the replaced letter

    let allSame = document.getElementsByClassName(letter);
    var i;
    for (i = 0; i < allSame.length; i++) {
        allSame[i].classList.toggle("selected");
        allSame[i].classList.remove("switched");
    }
  }

  replaceLetter(letter, e) {
    // find this element
    var matches = document.querySelectorAll("[data-replace='" + alphabet[e] + "']");

    // check if already used
    if(!matches[0].classList.contains("strike")) {
      matches[0].classList.add("strike");

      let allSelected = document.getElementsByClassName("selected");
      let selectedLength = allSelected.length - 1;
      let i;
      for (i = selectedLength; i >= 0; i--) {
          let curletr = allSelected[i];
          curletr.innerHTML = letter;
          curletr.classList.remove("selected");
          curletr.classList.add("switched");
      }
    }
  }

  splitRiddle(encrypted) {
    let splitRiddle = encrypted.toLowerCase().split(" ");
    let riddleHTML = [];
    for(var x = 0; x < splitRiddle.length; x++) {
      let doubledip = splitRiddle[x].split("");
      let newWord = [];
      for(var y = 0; y < doubledip.length; y++) {
        let current = doubledip[y];
        newWord.push(<span onClick={() => this.selectLetter(current)} key={y} data-letter={current} className={current}>{current}</span>);
      }
      riddleHTML.push(<div key={x} className="word">{newWord}</div>);
    }
    this.setState({riddle: riddleHTML});
  }

  encryptRiddle() {
    let splitRiddle = this.props.riddle.toLowerCase().split("");
    let encrypted = [];
    for(var x = 0; x < splitRiddle.length; x++) {
      let letterIndex = alphabet.indexOf(splitRiddle[x].toUpperCase());
      if(letterIndex >= 0) {
        encrypted.push(this.state.sortedAlpha[letterIndex]);
      } else {
        encrypted.push(" ");
      }
    }
    return encrypted.join("");
  }

  renderRiddle() {
    let newRiddle = this.encryptRiddle();
    this.splitRiddle(newRiddle);
  }

  render() {
    if(this.props.riddle === '') {
      return <div />
    }
    return  <div>
        <div className="riddle">
          <h2>Decrypt Quote Section</h2>
          {this.state.riddle}
        </div>
        <div className="with">
          <h2>Replace Selected With:</h2>
            {alphabet.map((letter, i) => (
              <span data-replace={letter} onClick={() => this.replaceLetter(letter.toLowerCase(), i)} key={letter}>{letter}</span>
            ))}
        </div>
      </div>;
  }
}

export default Riddle;
