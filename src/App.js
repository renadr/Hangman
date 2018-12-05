import React, { Component } from 'react';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LISTOFWORDS = ['BATEAU', 'ARBRE', 'TELEPHONE', 'ARMOIRE', 'PAPETERIE', 'VEHICULE', 'TROUSSEAU', 'CHOCOLAT', 'PISTOLET', 'MARMITE']

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      letters: this.createLetters(),
      word: this.pickRandomWordFromTheArray(),
      usedLetters: new Set(),
    }
  }

  createLetters() {
    const list = ALPHABET.split('')
    return list
  }

  DoIWin() {
    return !this.computeDisplay(this.state.word, this.state.usedLetters).split('').includes('_')
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  pickRandomWordFromTheArray() {
    return LISTOFWORDS[Math.floor(Math.random() * LISTOFWORDS.length)]
  }

  handleLetterClick(letter) {
    this.setState({
      usedLetters: this.state.usedLetters.add(letter),
      actualLetter: letter
    })
  }

  getFeedbackforLetter(index) {
    const { letters, usedLetters } = this.state
    if (usedLetters.has(letters[index])) return 'alreadyUsed'
    return 'neverUsed'
  }

  restart = () => {
    console.log('aha')
    this.setState({
      letters: this.createLetters(),
      word: this.pickRandomWordFromTheArray(),
      usedLetters: new Set(),
    })
    console.log(this.state.word)
  }

  render() {
    const letters = this.state.letters
    const won = this.DoIWin()
    return (
      <div className="App">
        <div className="word">
          {this.computeDisplay(this.state.word, this.state.usedLetters)}
        </div>
        {won ?
          <div className="newGameBtn" onClick={this.restart}>Nouvelle partie</div>
          :
          <div className="letterList">
            {letters.map((letter, index) =>
              <div className={`letter ${this.getFeedbackforLetter(index)}`} key={index} onClick={() => this.handleLetterClick(letter)}>{letter}</div>
            )}
          </div>
        }

        {/* // {won && } */}
      </div>
    );
  }
}

export default App;
