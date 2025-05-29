import { words } from "./modules/textParser.js";
import "./modules/renderText.js";
import { i } from "./utils/indexes.js";
import { dom } from "./utils/ElementsDOM.js";
import { typingText } from "./modules/typingText.js";
import "./modules/lineScroller.js";

const target_charDOM = document.getElementById("target_char");

function focus() {
  if (
    (i.word === 0 && i.char === 0) 
    && !dom.currentChar.classList.contains("word_active")
  ) {
    dom.currentChar.classList.add("word_active");
  }
  
  //замінити document на target_charDOM 
  document.addEventListener("keydown", typingText);
}
// замінити click на focus
target_charDOM.addEventListener("click", focus);
// target_charDOM.focus();

target_charDOM.addEventListener("contextmenu", () => {
  if (!dom.currentChar.classList.contains("word_active") && i.char === (words[i.word].length - 1) && i.word === (words.length - 1)) {
    //замінити document на target_charDOM 
    document.removeEventListener("keydown", typingText);
    target_charDOM.removeEventListener("click", focus);
  }
});
