import React, { Component } from 'react';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LISTOFWORDS = ['BATEAU', 'ARBRE', 'TELEPHONE', 'ARMOIRE', 'PAPETERIE', 'VEHICULE', 'TROUSSEAU', 'CHOCOLAT', 'PISTOLET', 'MARMITE']
const nbChances = 6

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      letters: this.createLetters(),
      word: this.pickRandomWordFromTheArray(),
      usedLetters: new Set(),
      try: 0,
      badTry: 0
    }
  }

  createLetters() {
    const list = ALPHABET.split('')
    return list
  }

  DoIWin() {
    return !this.computeDisplay(this.state.word, this.state.usedLetters).split('').includes('_')
  }

  computeDisplay(word, usedLetters) {
    return word.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  pickRandomWordFromTheArray() {
    return LISTOFWORDS[Math.floor(Math.random() * LISTOFWORDS.length)]
  }

  handleLetterClick(letter) {
    if(!this.state.usedLetters.has(letter)) {
      if(!this.state.word.split('').includes(letter)) {
        this.setState({
          badTry: this.state.badTry+1
        })
      }
      this.setState({
        usedLetters: this.state.usedLetters.add(letter),
        actualLetter: letter,
        try: this.state.try+1
      })
    }
  }

  getFeedbackforLetter(index) {
    const { letters, usedLetters } = this.state
    if (usedLetters.has(letters[index])) return 'alreadyUsed'
    return 'neverUsed'
  }

  restart = () => {
    this.setState({
      letters: this.createLetters(),
      word: this.pickRandomWordFromTheArray(),
      usedLetters: new Set(),
      try: 0,
      badTry: 0
    })
    console.log(this.state.word)
  }

  loosePercentage() {
    return (this.state.badTry * 100)/nbChances
  }

  gameIsOver(loosePercentage) {
    return loosePercentage === 100
  }

  render() {
    const letters = this.state.letters
    const won = this.DoIWin()
    const loosePercentage = this.loosePercentage()+'%'
    const gameOver = this.gameIsOver(this.loosePercentage())
    return (
      <div className="App">
        <div className="word" style={{backgroundPositionY:loosePercentage}}>
          {this.computeDisplay(this.state.word, this.state.usedLetters)}
        </div>
        {won || gameOver ?
          <div className="newGameBtn" onClick={this.restart}>Nouvelle partie</div>
          :
          <div className="letterList">
            {letters.map((letter, index) =>
              <div className={`letter ${this.getFeedbackforLetter(index)}`} key={index} onClick={() => this.handleLetterClick(letter)}>{letter}</div>
            )}
          </div>
        }
      </div>
    );
  }
}

export default App;
