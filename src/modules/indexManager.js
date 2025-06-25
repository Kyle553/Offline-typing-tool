class IndexManager {
  #wordI;
  #charI;

  constructor () {
    this.#wordI = 0;
    this.#charI = 0;
  }

  currentWord() {
    return this.#wordI;
  }

  nextWord() {
    this.#wordI++;
    this.#charI = 0;
    return this;
  }

  previousWord() {
    this.#wordI--;
  }

  replaceWord(num) {
    this.#wordI = num;
  }

  currentChar() {
    return this.#charI;
  }

  nextChar() {
    this.#charI++;
  }

  previousChar() {
    this.#charI--;
  }

  replaceChar(num) {
    this.#charI = num;
  }
  
  reset() {
    this.#wordI = 0;
    this.#charI = 0;
    return this;
  }
}

export { IndexManager };