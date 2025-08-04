import { getLoremWords } from "./utils/loremGenerator.js";
// import { getWords, setDefaultText } from "./utils/getWords.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { Stats } from "./modules/statsManager.js"
import { typingLogic } from "./modules/typingLogic.js";

const typingArea = document.getElementById("typingArea");

const words = getLoremWords(30); // getWords, setDefaultText
renderText(typingArea, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refreshCurrentWord();
const stats = new Stats();

const contextTyping = {
  words: words,
  index: index,
  dom: dom,
  stats: stats
}

dom.currentChar.classList.add("word_active");
typingArea.addEventListener("keydown", (event) => typingLogic(event, contextTyping));
// typingArea.focus();