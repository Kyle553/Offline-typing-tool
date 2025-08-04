class Stats {
  #totalWords;
  #totalChars;
  #correctWords;
  #correctChars;
  #errorsCount;
  #backspacesCount;
  #accuracy;
  #start;
  #end;
  #pause;

  constructor() {
    this.#totalWords = 0;
    this.#totalChars = 0;
    this.#correctWords = 0;
    this.#correctChars = 0;
    this.#errorsCount = 0;
    this.#backspacesCount = 0;
    this.#accuracy = 0;
    // Date.now()
    this.#start = null;
    this.#end = null;
    this.#pause = []; // Масив об'єктів, коли зникає і з'являється фокус
  }

  // totalWords
  incrementTotalWords() {
    this.#totalWords++;
  }

  decrementTotalWords() {
    this.#totalWords--;
  }

  // totalChars
  incrementTotalChars() {
    this.#totalChars++;
  }

  decrementTotalChars() {
    this.#totalChars--;
  }

  // correctWords
  incrementCorrectWords() {
    this.#correctWords++;
  }

  decrementCorrectWords() {
    this.#correctWords--;
  }

  // correctChars
  incrementCorrectChars() {
    this.#correctChars++;
  }

  decrementCorrectChars() {
    this.#correctChars--;
  }

  // errorsCount
  incrementErrorsCount() {
    this.#errorsCount++;
  }

  decrementErrorsCount() {
    this.#errorsCount--;
  }

  // backspacesCount
  incrementBackspacesCount() {
    this.#backspacesCount++;
  }

  decrementBackspacesCount() {
    this.#backspacesCount--;
  }

}

export { Stats };