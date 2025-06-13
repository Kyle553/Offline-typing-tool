import { separatedWordsSpaces } from "./utils/textParser.js";
import "./modules/renderText.js";
import { typingText } from "./modules/typingText.js";
import "./modules/lineScroller.js";
import { SetIndex } from "./modules/indexes.js";
import { elementsDOM, isCorrect } from "./modules/elementsDOM.js";

const words = separatedWordsSpaces();
const target_charDOM = document.getElementById("target_char");

const index = new SetIndex();
const newDOM = new elementsDOM(index);
newDOM.refresh();
// const indexesDOM = new SetIndexDOM(words ,newDOM);
isCorrect(newDOM);

function focus() {
  if (
    (index.currentWord() === 0 && index.currentChar() === 0) 
    && !newDOM.currentChar.classList.contains("word_active")
  ) {
    newDOM.currentChar.classList.add("word_active");
  }
  
  //замінити document на target_charDOM 
document.addEventListener("keydown", (event) => typingText(event, index, newDOM));
}
// замінити click на focus
target_charDOM.addEventListener("click", focus);
// target_charDOM.focus();

target_charDOM.addEventListener("contextmenu", () => {
  if (!newDOM.currentChar.classList.contains("word_active") && index.currentChar() === (words[index.currentWord()].length - 1) && index.currentWord() === (words.length - 1)) {
    //замінити document на target_charDOM 
    document.removeEventListener("keydown", typingText);
    target_charDOM.removeEventListener("click", focus);
  }
});