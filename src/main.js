import { textParser } from "./modules/textParser.js";
import { renderText } from "./modules/renderText.js";
import { i } from "./utils/indexes.js";
// import { domElements, refreshVariables } from "./utils/elementsDOM.js";
import { typingText, currentCharDOM } from "./modules/typingText.js";

const words = textParser();

// target_charDOM.focus();
const target_charDOM = document.getElementById("target_char");


const firstWordDOM = document.querySelector(".word");
const firstCharDOM = firstWordDOM.querySelector("span");

function focus() {
  if (i.word === 0 && i.char === 0) {
    firstCharDOM.classList.add("word_active");
  }
  
  //замінити document на target_charDOM 
  document.addEventListener("keydown", typingText);
}
// замінити click на focus
target_charDOM.addEventListener("click", focus);

target_charDOM.addEventListener("contextmenu", () => {
  if (!currentCharDOM.classList.contains("word_active") && i.char === (words[i.word].length - 1) && i.word === (words.length - 1))
  document.removeEventListener("keydown", typingText);
  target_charDOM.removeEventListener("click", focus);
});
