function isCorrect(newDOM) {
  newDOM.refresh();
  return newDOM.currentChar.classList.contains("correct") ? "correct" : "incorrect";
}

class elementsDOM {
  constructor(indexes) {
    this.indexes = indexes;
    this.allWords = document.querySelectorAll(".word");
    this.currentWord = null;
    this.allChars = null;
    this.currentChar = null;
  }

  refresh() {
    // this.allWords = document.querySelectorAll(".wordI");
    this.currentWord = this.allWords[this.indexes.wordI];
    this.allChars = this.currentWord.querySelectorAll("span");
    this.currentChar = this.allChars[this.indexes.charI];
  }
}

export { isCorrect, elementsDOM };