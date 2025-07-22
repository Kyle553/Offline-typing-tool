import { getLoremWords } from "./utils/loremGenerator.js";
// import { getWords, setDefaultText } from "./utils/getWords.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingLogic } from "./modules/typingLogic.js";

const typingArea = document.getElementById("typingArea");

const words = getLoremWords(30); // getWords, setDefaultText
renderText(typingArea, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refreshCurrentWord();

let typingStats = {
  totalWords: 0,
  totalChars: 0,    
  correctWords: 0,
  correctChars: 0,
  errorsCount: 0,       
  backspacesCount : 0,
  accuracy: 0         // Точність у відсотках
}

// Date.now()
let timeStats = {
  end: null,          
  start: null,        
  pause: []           // Масив з об'єктами коли зникає і з'являється фокус
}

const contextTyping = {
  words: words,
  index: index,
  dom: dom
}

dom.currentChar.classList.add("word_active");
typingArea.addEventListener("keydown", (event) => typingLogic(event, contextTyping, typingStats));
// typingArea.focus();