import { separatedWordsSpaces } from "../utils/textParser.js";
import { i } from "./indexes.js";
import { dom, isCorrect } from "./elementsDOM.js";
import { setClasses, containsClasses } from "../utils/classManagerDOM.js";

const words = separatedWordsSpaces();


function typingText(event) {
  let currentWord = words[i.word];

  function isLastCharOfLastWord() {
    return i.char === (currentWord.length - 1) && i.word === (words.length - 1) ? true : false;
  }

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
      setClasses(dom.currentChar, "word_active");

      i.word -= 1;

      currentWord = words[i.word];
      i.char = currentWord.length - 1;

      dom.refresh();
      setClasses(dom.currentChar, ["word_active", isCorrect()]);
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (i.char > 0) {
      if (
        i.char === (currentWord.length - 1) 
        && i.word === (words.length - 1)
        && !dom.currentChar.classList.contains("word_active")
      ) {
        setClasses(dom.currentChar, ["word_active", isCorrect()]);
        console.log(i.char, i.word, "умова")
        return;
      }

      setClasses(dom.currentChar, "word_active");
      i.char -= 1;
      dom.refresh();
      setClasses(dom.currentChar, ["word_active", isCorrect()]);
    }
  };

  function handleTypingChar() {
    if (isLastCharOfLastWord() && !containsClasses(dom.currentChar, "word_active")) {
      return;
    }

    const charStatusClass = 
      currentWord[i.char] === event.key  
      || (event.key === " " && currentWord[i.char] === "\u00A0")
      ? "correct"
      : "incorrect";

    setClasses(dom.currentChar, charStatusClass);

    if (i.char < (currentWord.length - 1)) {
      setClasses(dom.currentChar, "word_active");
      i.char += 1;
      dom.refresh();
      setClasses(dom.currentChar, "word_active");
      return;
    }

    if (i.char === (currentWord.length - 1) && i.word < (words.length - 1)) {
      setClasses(dom.currentChar, "word_active");
      i.word += 1;
      i.char = 0;  
      dom.refresh();
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      setClasses(dom.currentChar, "word_active");
      return;
    }

    if (isLastCharOfLastWord()) {
      setClasses(dom.currentChar, "word_active");
    }
  };
};


export { typingText };