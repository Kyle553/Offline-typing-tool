import { words } from "../utils/textParser.js";
import { i } from "./indexes.js";
import { dom, isCorrect } from "./elementsDOM.js";
import { setClassDOM } from "../utils/setClassDOM.js";


function typingText(event) {
  let currentWord = words[i.word];

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    handleTypingChar();
    return;
  }

  function backspace() {
    if (i.char === 0 && i.word > 0) {
      setClassDOM(dom.currentChar, "word_active");

      i.word -= 1;

      currentWord = words[i.word];
      i.char = currentWord.length - 1;

      dom.refresh();
      setClassDOM(dom.currentChar, ["word_active", isCorrect()]);
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (i.char > 0) {
      if (
        i.char === (currentWord.length - 1) 
        && i.word === (words.length - 1)
        && !dom.currentChar.classList.contains("word_active")
      ) {
        setClassDOM(dom.currentChar, ["word_active", isCorrect()]);
        return;
      }

      setClassDOM(dom.currentChar, "word_active");
      i.char -= 1;
      dom.refresh();
      setClassDOM(dom.currentChar, ["word_active", isCorrect()]);
    }
  };

  function handleTypingChar() {
    const charStatusClass = 
      currentWord[i.char] === event.key  
      || (event.key === " " && currentWord[i.char] === "\u00A0")
      ? "correct"
      : "incorrect";

    setClassDOM(dom.currentChar, charStatusClass);

    if (i.char < (currentWord.length - 1)) {
      setClassDOM(dom.currentChar, "word_active");
      i.char += 1;
      dom.refresh();
      setClassDOM(dom.currentChar, "word_active");
      return;
    }

    if (i.char === (currentWord.length - 1) && i.word < (words.length - 1)) {
      setClassDOM(dom.currentChar, "word_active");
      i.word += 1;
      i.char = 0;  
      dom.refresh();
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      setClassDOM(dom.currentChar, "word_active");
      return;
    }

    if (i.char === (currentWord.length - 1) && i.word === (words.length - 1)) {
      setClassDOM(dom.currentChar, "word_active");
    }
  };
};

export { typingText };

// в кінці проблеми з індексом і класами