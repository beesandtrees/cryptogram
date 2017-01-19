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
    if(this.props.riddle !== this.state.vanillaRiddle) {
      this.renderRiddle();
      this.setState({vanillaRiddle: this.props.riddle});
      this.setState({sortedAlpha: this.shuffleAlphabet()});
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
    let allSame = document.getElementsByClassName(letter),
        sameLength = allSame.length,
        replacementLetter = '',
        allSelected = document.getElementsByClassName("selected");


    if(allSame[0].classList.contains("switched")) {
      replacementLetter = allSame[0].dataset.letter
      this.replaceLetter(allSame[0].innerHTML, true);
    }
    // only do stuff if no others are selected
    if (allSelected.length === 0){
      var i;
      for (i = 0; i < sameLength; i++) {
        // if this letter has already been switched
        if(allSame[i].classList.contains("switched")) {
        // want to instead turn it off and allow it to be played again
          allSame[i].classList.remove("switched");
          allSame[i].classList.remove("selected");
        // to do so we must also unstrike the replaced letter
          allSame[i].innerHTML = replacementLetter;
        } else {
          allSame[i].classList.add("selected");
        }
      }
    } else {
      for (i = sameLength-1; i >= 0; i--) {
        allSame[i].classList.remove("selected");
      }
    }
  }

  renderEncryptedRiddle() {
    let allSwitched = document.getElementsByClassName("switched");
    let encryptedRiddle = [];
    for (let i = 0; i < allSwitched.length; i++) {
        encryptedRiddle.push(allSwitched[i].innerHTML);
    }

    encryptedRiddle = encryptedRiddle.join("").toLowerCase();

    return encryptedRiddle;
  }

  replaceLetter(letter, removeStrike) {
    // find the replacement letter element
    let matches = document.querySelectorAll("[data-replace='" + letter.toUpperCase() + "']");
    let allSelected = document.getElementsByClassName("selected");
    let encryptedRiddle = '';

    // check if already used - if so - skip and move on
    if(removeStrike === false) {
        // only move forward if there is a selected letter to replace
        if (allSelected.length > 0){
          // strike through the replacement letter
          matches[0].classList.add("strike");
          let selectedLength = allSelected.length - 1;
          let i;
          // count down through the list of selected letters and add switched
          // also replace the current original letter
          for (i = selectedLength; i >= 0; i--) {
              let curletr = allSelected[i];
              curletr.innerHTML = letter;
              curletr.classList.remove("selected");
              curletr.classList.add("switched");
          }
          encryptedRiddle = this.renderEncryptedRiddle();
        }
    // if already used and none are selected we're removing it
    } else {
        matches[0].classList.remove("strike");
    }
    // Set up check to see if riddle has been solved
    // this.props.riddle === this.state.vanillaRiddle
    if(this.state.vanillaRiddle.split(" ").join("").toLowerCase() === encryptedRiddle) {
      document.getElementsByClassName("riddle")[0].classList.add("solved");
    }
  }

  splitRiddle(encrypted) {
    let splitEncrypted = encrypted.toLowerCase().split(" ");
    let riddleHTML = [];
    // loop through words
    for(var x = 0; x < splitEncrypted.length; x++) {
      let doubledip = splitEncrypted[x].split("");
      let newWord = [];
      // loop through letters and render them into spans
      for(var y = 0; y < doubledip.length; y++) {
        let current = doubledip[y];
        newWord.push(<span onClick={() => this.selectLetter(current)} key={y} data-letter={current} className={current}>{current}</span>);
      }
      // insert the spans into words
      riddleHTML.push(<div key={x} className="word">{newWord}</div>);
    }
    this.setState({riddle: riddleHTML});
  }

  encryptRiddle() {
    let splitEncrypted = this.props.riddle.toLowerCase().split("");
    let encrypted = [];
    // loop through the letters and replace them with new ones
    for(var x = 0; x < splitEncrypted.length; x++) {
      let letterIndex = alphabet.indexOf(splitEncrypted[x].toUpperCase());
      if(letterIndex >= 0) {
        encrypted.push(this.state.sortedAlpha[letterIndex]);
      } else {
        encrypted.push(" ");
      }
    }
    let encryptedRiddle = encrypted.join("");

    return encryptedRiddle;
  }

  renderRiddle() {
    // encrypt the riddle
    let newRiddle = this.encryptRiddle();
    // now split it into individual spans
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
          <h2>&mdash; {this.props.author}</h2>
        </div>
        <div className="with">
          <h2>Replace Selected With:</h2>
            {alphabet.map((letter, i) => (
              <span data-replace={letter} onClick={() => this.replaceLetter(letter.toLowerCase(), false)} key={letter}>{letter}</span>
            ))}
        </div>
      </div>;
  }
}

export default Riddle;
