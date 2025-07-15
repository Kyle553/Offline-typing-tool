import { getLoremWords } from "./utils/loremGenerator.js";
// import { getWords, setDefaultText } from "./utils/getWords.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingLogic } from "./modules/typingLogic.js";
import { statsLogic } from "./modules/statsLogic.js";

const typingArea = document.getElementById("typingArea");

const words = getLoremWords(30); // getWords, setDefaultText
renderText(typingArea, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refreshCurrentWord();

let typingStats = {
  totalWords: 0,
  totalChar: 0,    
  correctWord: 0,
  correctChar: 0,
  errorsCount: 0,       
  raw: 0              // Всі слова навіть з помилками  
}

// Date.now()
let timeStats = {
  end: null,          
  start: null,        
  pause: []           // Масив з об'єктами коли зникає і з'являється фокус
}

let resultStats = {
  wpm: 0,             // Слів без полимок
  accuracy: 0         // Точність у відсотках
}

const contextTyping = {
  words: words,
  index: index,
  dom: dom
}

const contextStats = {
  typingStats: typingStats,
  timeStats: timeStats,
  resultStats: resultStats
}

dom.currentChar.classList.add("word_active");
typingArea.addEventListener("keydown", (event) => typingLogic(event, contextTyping, typingStats));
// typingArea.focus();

typingArea.addEventListener("focus", statsLogic(contextStats));