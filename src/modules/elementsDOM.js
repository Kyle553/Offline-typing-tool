class elementsDOM {
  constructor(indexes) {
    this.indexes = indexes;
    this.allWords = document.querySelectorAll(".word");
    this.currentWord = null;
    this.allChars = null;
    this.currentChar = null;
  }

  refresh() {
    // this.allWords = document.querySelectorAll(".word");
    this.currentWord = this.allWords[this.indexes.currentWord()];
    this.allChars = this.currentWord.querySelectorAll("span");
    this.currentChar = this.allChars[this.indexes.currentChar()];
  }
}

export { elementsDOM };