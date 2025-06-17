import { separatedWordsSpaces, loremGenerator } from "./utils/textParser.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexes.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingText } from "./modules/typingText.js";

const words = loremGenerator(30);
const target_charDOM = document.getElementById("target_char");
renderText(target_charDOM, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refresh();

function focus() {
  if (
    (index.currentWord() === 0 && index.currentChar() === 0) 
    && !dom.currentChar.classList.contains("word_active")
  ) {
    dom.currentChar.classList.add("word_active");
  }
  
  //замінити document на target_charDOM 
document.addEventListener("keydown", (event) => typingText(event, words, index, dom));
}
// замінити click на focus
target_charDOM.addEventListener("click", focus);
// target_charDOM.focus();