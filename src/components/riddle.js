import React, { useEffect, useRef, useState } from "react";
import { alphabet } from "../helpers/alphabet";

// TODO Add Hints Button

const Riddle = ({ category, riddle }) => {
  const [parsedRiddle, setParsedRiddle] = useState(riddle.lines);
  const [vanillaRiddle] = useState(null);
  const originalRiddle = useRef("");

  useEffect(() => {
    if (riddle !== "") {
      if (riddle.lines.join(" ") !== vanillaRiddle) {
        renderRiddle();
        originalRiddle.current = riddle.lines.join(" ");
      }
    }
  }, []);

  const shuffleAlphabet = () => {
    // create an alphabet array with real letters as keys and new letters as values
    // use this to create
    let doubleBet = alphabet.slice(0);
    let alphaLong = doubleBet.length;
    let sorted = [];
    for (var i = 0; i < alphaLong; i++) {
      // get a random number from the new array
      var random = Math.floor(Math.random() * doubleBet.length);

      if (alphabet[i] === doubleBet[random]) {
        random = Math.floor(Math.random() * doubleBet.length);
      }

      // remove the random letter from the new array
      var letter = doubleBet.splice(random, 1)[0];

      // push the letter into a new array
      sorted.push(letter);
    }
    return sorted;
  };

  const selectLetter = (letter) => {
    let allSame = document.getElementsByClassName(letter),
      sameLength = allSame.length,
      replacementLetter = "",
      allSelected = document.getElementsByClassName("selected");

    if (allSame[0].classList.contains("switched")) {
      replacementLetter = allSame[0].dataset.letter;
      replaceLetter(allSame[0].innerHTML, true);
    }
    // only do stuff if no others are selected
    if (allSelected.length === 0) {
      var i;
      for (i = 0; i < sameLength; i++) {
        // if this letter has already been switched
        if (allSame[i].classList.contains("switched")) {
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
      for (i = sameLength - 1; i >= 0; i--) {
        allSame[i].classList.remove("selected");
      }
    }
  };

  const renderEncryptedRiddle = () => {
    let allSwitched = document.getElementsByClassName("letter");
    let encryptedRiddle = [];
    for (let i = 0; i < allSwitched.length; i++) {
      encryptedRiddle.push(allSwitched[i].innerHTML);
    }

    encryptedRiddle = encryptedRiddle.join("").toLowerCase();

    return encryptedRiddle;
  };

  const resetClasses = () => {
    let allLetters = document.getElementsByClassName("letter");
    for (let i = 0; i < allLetters.length; i++) {
      let trueLetter = allLetters[i].innerHTML;
      console.log(trueLetter);
    }
  };

  const replaceLetter = (letter, removeStrike) => {
    // find the replacement letter element
    let matches = document.querySelectorAll(
      "[data-replace='" + letter.toUpperCase() + "']"
    );
    let allSelected = document.getElementsByClassName("selected");
    let encryptedRiddle = "";

    // check if already used - if so - skip and move on
    if (removeStrike === false) {
      // only move forward if there is a selected letter to replace
      if (allSelected.length > 0) {
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
        encryptedRiddle = renderEncryptedRiddle();
      }
      // if already used and none are selected we're removing it
    } else {
      matches[0].classList.remove("strike");
    }
    // Set up check to see if riddle has been solved
    // riddle === vanillaRiddle
    // .replace(/['—’"?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    if (
      originalRiddle.current.split(" ").join("").toLowerCase() ===
      encryptedRiddle
    ) {
      document.getElementsByClassName("riddle")[0].classList.add("solved");
      resetClasses();
    }
  };

  const splitRiddle = (encrypted) => {
    let riddleHTML = [];
    // loop through words
    for (let x = 0; x < encrypted.length; x++) {
      let doubledip = encrypted[x].toLowerCase().split(" ");
      let newPhrase = [];

      // loop through letters and render them into spans
      for (let y = 0; y < doubledip.length; y++) {
        let current = doubledip[y];
        let newWord = [];
        for (let nw = 0; nw < current.length; nw++) {
          let isPunctuation = alphabet.indexOf(current[nw].toUpperCase());
          let newLetter = "";
          let currentClass = "letter " + current[nw];
          if (isPunctuation >= 0) {
            newLetter = (
              <span
                onClick={() => selectLetter(current[nw])}
                key={nw}
                data-letter={current[nw]}
                className={currentClass}
              >
                {current[nw]}
              </span>
            );
          } else {
            newLetter = (
              <span
                onClick={() => selectLetter(current[nw])}
                key={nw}
                data-letter={current[nw]}
                className="letter punctuation"
              >
                {current[nw]}
              </span>
            );
          }
          newWord.push(newLetter);
        }
        newPhrase.push(
          <div key={y} className="word">
            {newWord}
          </div>
        );
      }
      // insert the words into phrases
      riddleHTML.push(
        <div key={x * 37} className="phrase">
          {newPhrase}
        </div>
      );
    }
    setParsedRiddle(riddleHTML);
  };

  const encryptRiddle = () => {
    let encrypted = [];
    const sortedAlphabet = shuffleAlphabet();

    for (var l = 0; l < riddle.lines.length; l++) {
      let whatsMyLine = riddle.lines[l];
      let encryptedLine = [];

      let splitEncrypted = whatsMyLine.toLowerCase().split("");

      // loop through the letters and replace them with new ones
      for (var x = 0; x < splitEncrypted.length; x++) {
        let letterIndex = alphabet.indexOf(splitEncrypted[x].toUpperCase());
        if (letterIndex >= 0) {
          encryptedLine.push(sortedAlphabet[letterIndex]);
        } else {
          encryptedLine.push(splitEncrypted[x]);
        }
      }
      encrypted.push(encryptedLine.join(""));
    }

    let encryptedRiddle = encrypted;
    return encryptedRiddle;
  };

  const renderRiddle = () => {
    // encrypt the riddle
    let newRiddle = encryptRiddle();
    // now split it into individual spans
    splitRiddle(newRiddle);
  };

  if (riddle === "") {
    return <div />;
  }
  return (
    <div>
      <div className="with">
        <h2>Replace Letter With:</h2>
        <div className="alphabet">
          {alphabet.map((letter) => (
            <span
              data-replace={letter}
              onClick={() => replaceLetter(letter.toLowerCase(), false)}
              key={letter}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="riddle">
        <h2 className="category">category: {category.toUpperCase()}</h2>
        {parsedRiddle}
        <h2 className="author">&mdash; {riddle.author}</h2>
      </div>
    </div>
  );
};

export default Riddle;
