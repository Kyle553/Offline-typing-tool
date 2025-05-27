import { i } from "./indexes.js";

let dom = {
  allWords: document.querySelectorAll(".word"),
  currentWord: null,
  allChars: null,
  currentChar: null,

  refresh() {
    this.currentWord = this.allWords[i.word];
    this.allChars = this.currentWord.querySelectorAll("span");
    this.currentChar = this.allChars[i.char];
  }
};

dom.refresh();

export { dom };