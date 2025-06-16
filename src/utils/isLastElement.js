function isLastChar(words, index) {
  const isLastChar = index.currentChar() === (words[index.currentWord()].length - 1);
  return isLastChar;
}

function isLastWord(words, index) {
  const isLastWord = index.currentWord() === (words.length - 1);
  return isLastWord;
}

export { isLastChar, isLastWord };