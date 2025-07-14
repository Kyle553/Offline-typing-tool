import { getLoremWords } from "./utils/loremGenerator.js";
// import { getWords, setDefaultText } from "./utils/getWords.js";
import { renderText } from "./modules/renderText.js";
import { IndexManager } from "./modules/indexManager.js";
import { elementsDOM} from "./modules/elementsDOM.js";
import { typingLogic } from "./modules/typingLogic.js";

const words = getLoremWords(30);
const typingArea = document.getElementById("typingArea");
renderText(typingArea, words);

const index = new IndexManager();
const dom = new elementsDOM(index);
dom.refreshCurrentWord();

dom.currentChar.classList.add("word_active");
typingArea.addEventListener("keydown", (event) => typingLogic(event, words, index, dom));
// typingArea.focus();