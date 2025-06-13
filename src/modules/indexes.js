class SetIndex {
  constructor () {
    this.wordI = 0;
    this.charI = 0;
  }

  currentWord() {
    return this.wordI;
  }

  nextWord() {
    this.wordI++;
    this.charI = 0;
    return this;
  }

  previousWord() {
    this.wordI--;
    return this;
  }

  replaceWord(num) {
    this.wordI = num;
    return this;
  }

  currentChar() {
    return this.charI;
  }

  nextChar() {
    this.charI++;
    return this;
  }

  previousChar() {
    this.charI--;
    return this;
  }

  replaceChar(num) {
    this.charI = num;
    return this;
  }
  
  reset() {
    this.wordI = 0;
    this.charI = 0;
    return this;
  }
}

// class SetIndexDOM extends SetIndex {
//   constructor(words, dom) {
//     super();
//     this.words = words;
//     this.dom = dom;
//   }

//   previousChar() {
//     this.wordI--;
//     this.charI = this.words[this.wordI].length - 1;
//   }

// }

export { SetIndex };