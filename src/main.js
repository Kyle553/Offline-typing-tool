import { getLoremWords } from "./utils/loremGenerator.js";
// import { getWords, setDefaultText } from "./utils/getWords.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingText } from "./modules/typingText.js";

const words = getLoremWords(30);
const target_charDOM = document.getElementById("typingArea");
renderText(target_charDOM, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refreshCurrentWord();

dom.currentChar.classList.add("word_active");
target_charDOM.addEventListener("keydown", (event) => typingText(event, words, index, dom));
// target_charDOM.focus();