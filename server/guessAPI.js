import * as guessService from './service/guess'

export function *getGuesses() {
    let guesses = yield guessService.getGuesses();

    this.status = 200;
    this.body = {guesses};
}

export function *addGuess() {
    let guess = this.request.body;
    console.log(guess)

    yield guessService.addGuess((guess));

    this.status = 200;
    this.body = 'Success!'
}
