import { setClasses, isCorrect} from "../utils/classManagerDOM.js";
import { isLastChar, isLastWord } from "../utils/isLastElement.js";

function typingLogic(event, contextTyping, typingStats) {
  // Деструктуризація об'єкта з об'єктами за посиланням
  const { words, index, dom } = contextTyping;

  let currentWord = words[index.currentWord()];

  function backspace() {
    if (index.currentChar() === 0 && index.currentWord() > 0) {
      setClasses(dom.currentChar, "word_active");
      
      index.previousWord();
      
      currentWord = words[index.currentWord()];
      index.replaceChar(currentWord.length - 1);
      
      dom.refreshCurrentWord();
      setClasses(dom.currentChar, ["word_active", isCorrect(dom.currentChar)]);
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    if (index.currentChar() > 0) {
      if (
        (isLastChar(words, index) && isLastWord(words, index)) 
        && !dom.currentChar.classList.contains("word_active")
      ) {
        setClasses(dom.currentChar, ["word_active", isCorrect(dom.currentChar)]);
        return;
      }
      
      setClasses(dom.currentChar, "word_active");
      index.previousChar();
      dom.refreshCurrentWord();
      setClasses(dom.currentChar, ["word_active", isCorrect(dom.currentChar)]);
    }
  };
  
  function handleTypingChar() {
    if (
      isLastChar(words, index) && isLastWord(words, index) 
      && !dom.currentChar.classList.contains("word_active")
    ) {
      return;
    }
    
    let charStatusClass = "";

    if (
      currentWord[index.currentChar()] === event.key
      || (event.key === " " && currentWord[index.currentChar()] === "\u00A0")
    ) {
      charStatusClass = "correct";
    } else {
      charStatusClass = "incorrect";
    }

    setClasses(dom.currentChar, charStatusClass);
    
    if (index.currentChar() < (currentWord.length - 1)) {
      setClasses(dom.currentChar, "word_active");
      index.nextChar();
      dom.refreshCurrentWord();
      setClasses(dom.currentChar, "word_active");
      return;
    }

    if (isLastChar(words, index) && index.currentWord() < (words.length - 1)) {
      setClasses(dom.currentChar, "word_active");
      index.nextWord();
      dom.refreshCurrentWord();
      dom.currentChar.scrollIntoView({ behavior: "smooth", block: "center" });
      setClasses(dom.currentChar, "word_active");
      return;
    }
    
    if (isLastChar(words, index) && isLastWord(words, index)) {
      setClasses(dom.currentChar, "word_active");
    }
  };

  if (event.key === "Backspace") {
    backspace();
    return;
  }
  
  if (event.key.length === 1) {
    handleTypingChar();
    return;
  }
};

export { typingLogic };