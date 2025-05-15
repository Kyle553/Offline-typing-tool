import { renderText } from "./renderText.js";

const text = "123 All visuals and music in this video";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
const words = text.match(/\S+|\s+/g)
words.forEach((element, index, arr) => {
  arr[index] = element.replace(/ /g, "\u00A0");
});

renderText(words);

let wordIndex = 0;
let charIndex = 0;
let totalChars = 0;



for (let element of words) {
  totalChars += element.length;
}

const target_charDOM = document.getElementById("target_char");
// target_charDOM.focus();
// замінити click на focus
target_charDOM.addEventListener("click", () => {
  //замінити document на target_charDOM
  document.addEventListener("keydown", typingText);
});

function typingText(event) {
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  let allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];

  let currentWord = words[wordIndex];

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    handleChar();
    return;
  }

  function backspace() {
    if (charIndex === 0 && wordIndex > 0) {
      if (currentCharDOM.classList.length > 0) {
        currentCharDOM.classList.remove("correct", "incorrect");
      }
      wordIndex -= 1;

      currentWord = words[wordIndex];
      charIndex = currentWord.length - 1;

      currentWordDOM = allWordsDOM[wordIndex];
      allCharsDOM = currentWordDOM.querySelectorAll("span");
      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.remove("correct", "incorrect");
      return;
    }

    if (charIndex > 0) {
      if (charIndex === currentWord.length - 1 && currentCharDOM.classList.length > 0) {
        currentCharDOM.classList.remove("correct", "incorrect");
      } else {
        charIndex -= 1;
        currentCharDOM = allCharsDOM[charIndex];
        currentCharDOM.classList.remove("correct", "incorrect");
      }
    }
  };

  function handleChar() {
    if (charIndex <= (currentWord.length - 1)) {
      let className = "";
      if (
        currentWord[charIndex] === event.key || 
        (event.key === " " && currentWord[charIndex] === "\u00A0")
      ) {
        className = "correct";
      } else {
        className = "incorrect";
      }

      currentCharDOM.classList.add(className);
      if (charIndex < (currentWord.length - 1)) {
        charIndex += 1;
        return;
      }

      if (charIndex === (currentWord.length - 1) && wordIndex < (words.length - 1)) {
        wordIndex += 1;
        charIndex = 0;  
      }
    } 
  };
};