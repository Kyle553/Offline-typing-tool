import { renderText } from "./modules/renderText.js";
import { typingText, wordIndex, charIndex } from "./modules/typingText.js";
import { textParser } from "./modules/textParser.js";

const words = textParser();
renderText(words);

const target_charDOM = document.getElementById("target_char");
// target_charDOM.focus();
// замінити click на focus
const firstWordDOM = document.querySelector(".word");
const firstCharDOM = firstWordDOM.querySelector("span");
target_charDOM.addEventListener("click", () => {
  //замінити document на target_charDOM 
  if (wordIndex === 0 && charIndex === 0) {
    firstCharDOM.classList.add("word_active");
  }

  document.addEventListener("keydown", typingText);
});