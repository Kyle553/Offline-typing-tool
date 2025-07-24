class Stats {
  #writtenWordsNodes = [];
  #writtenCharsNodes = [];
  
  constructor(index, dom) {
    this.index = index,
    this.dom = dom
  }
  
  #originalWord = "";
  #cleanWord = "";
  
  filter(currentWord) {
    this.#originalWord = currentWord;

    const quotesAndBrackets = ['"', ")"];
    const endOrSeparator = [".", "!", "?", ",", ":"];
    let startIndex = 0;
    let expectedCharCount = 0;

    if (quotesAndBrackets.includes(currentWord.at(-1))) {
      startIndex = 1;
      expectedCharCount = currentWord.length - 2;
    } 

    if(endOrSeparator.includes(currentWord.at(-1))) {
      expectedCharCount = currentWord.length - 1;
    }

    if (expectedCharCount > 0) {
      this.#cleanWord = currentWord.slice(startIndex, (startIndex + expectedCharCount));
    } else {
      this.#cleanWord = currentWord;
    }
  }
}