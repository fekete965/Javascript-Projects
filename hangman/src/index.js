import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#hangman-puzzle')
const guessesEl = document.querySelector('#hangman-guesses')
let game1 = undefined

// puzzleEl.textContent = game1.puzzle
// guessesEl.textContent = game1.remainingGuesses

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    const puzzleFragments = document.createDocumentFragment()

    game1.puzzle.split('').forEach( (letter) => {
        const span = document.createElement('span')
        span.textContent = letter
        puzzleFragments.appendChild(span)
    })

    puzzleEl.appendChild(puzzleFragments)
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

startGame()


document.querySelector('#reset').addEventListener('click', startGame)