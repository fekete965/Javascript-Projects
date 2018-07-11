class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetter = []
        this.status = 'playing'
    }

    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetter.includes(guess)
        const isBadGuess = !this.word.includes(guess)
    
        if (this.status !== 'playing') { 
            return
        }
    
        if (isUnique) {
            this.guessedLetter.push(guess)
        }
    
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }
    
        this.calculateStatus()
    }

    get puzzle() {
        let puzzle = ''
        this.word.forEach( (letter) => {
            if (this.guessedLetter.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }

    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetter.includes(letter) || letter === ' ')
    
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try, the word was "${this.word.join('')}".`
        } else {
            return `Great work! You guessed the word.`
        }
    }
}

export { Hangman as default }

// const Hangman = function(word, remainingGuesses) {
//     this.word = word.toLowerCase().split('')
//     this.remainingGuesses = remainingGuesses
//     this.guessedLetter = []
//     this.status = 'playing'
// }

// Hangman.prototype.makeGuess = function(guess) {
//     guess = guess.toLowerCase()
//     const isUnique = !this.guessedLetter.includes(guess)
//     const isBadGuess = !this.word.includes(guess)

//     if (this.status !== 'playing') { 
//         return
//     }

//     if (isUnique) {
//         this.guessedLetter.push(guess)
//     }

//     if (isUnique && isBadGuess) {
//         this.remainingGuesses--
//     }

//     this.calculateStatus()
// }

// Hangman.prototype.getPuzzle = function() {
//     let puzzle = ''
//     this.word.forEach( (letter) => {
//         if (this.guessedLetter.includes(letter)) {
//             puzzle += letter
//         } else if (letter === ' ') {
//             puzzle += ' '
//         } else {
//             puzzle += '*'
//         }
//     })
//     return puzzle
// }

// Hangman.prototype.calculateStatus = function() {

//     // THIRD APPROACH //
//     const finished = this.word.every((letter) => this.guessedLetter.includes(letter))
//     // Longer version
//     // const finished = this.word.every((letter) => {
//     //     return this.guessedLetter.includes(letter)
//     // })


//     // SECOND APPROACH //
//     // const letterUnguessed = this.word.filter((letter) => {
//     //     return !this.guessedLetter.includes(letter)
//     // })
//     // const finished = letterUnguessed.length === 0

//     // FIRST APPROACH //
//     // const finished = true
//     // this.word.forEach( (letter) => {
//     //     if (this.guessedLetter.includes(letter)) {

//     //     } else {
//     //         finished = false
//     //     }
//     // })

//     if (this.remainingGuesses === 0) {
//         this.status = 'failed'
//     } else if (finished) {
//         this.status = 'finished'
//     } else {
//         this.status = 'playing'
//     }
// }


// Hangman.prototype.getStatusMessage = function() {
//     if (this.status === 'playing') {
//         return `Guesses left: ${this.remainingGuesses}`
//     } else if (this.status === 'failed') {
//         return `Nice try, the word was "${this.word.join('')}"`
//     } else {
//         return `Great work! You guessed the word`
//     }
// }