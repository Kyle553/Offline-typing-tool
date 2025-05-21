import { renderText } from "./modules/renderText.js";
import { typingText, wordIndex, charIndex } from "./modules/typingText.js";
import { textParser } from "./modules/textParser.js";

const words = textParser();
renderText(words);

// target_charDOM.focus();
const target_charDOM = document.getElementById("target_char");
const firstWordDOM = document.querySelector(".word");
const firstCharDOM = firstWordDOM.querySelector("span");

function focus() {
  if (wordIndex === 0 && charIndex === 0) {
    firstCharDOM.classList.add("word_active");
  }
  
  //замінити document на target_charDOM 
  document.addEventListener("keydown", typingText);
}
// замінити click на focus
target_charDOM.addEventListener("click", focus);

