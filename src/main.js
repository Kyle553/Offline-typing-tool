import { separatedWordsSpaces, loremGenerator } from "./utils/textParser.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingText } from "./modules/typingText.js";

const words = loremGenerator(30);
const target_charDOM = document.getElementById("typingArea");
renderText(target_charDOM, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refresh();

dom.currentChar.classList.add("word_active");
target_charDOM.addEventListener("keydown", (event) => typingText(event, words, index, dom));
// target_charDOM.focus();