import { setClasses, isCorrect} from "../utils/classManagerDOM.js";
import { isLastChar, isLastWord } from "../utils/isLastElement.js";
import { getLoremWords } from "../utils/loremGenerator.js";

function typingLogic(event, words, index, dom) {
  let currentWord = words[index.currentWord()];
  let currentOffsetTop = dom.currentWord.offsetTop;

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
    
    const charStatusClass = 
    currentWord[index.currentChar()] === event.key  
    || (event.key === " " && currentWord[index.currentChar()] === "\u00A0")
    ? "correct"
    : "incorrect";
    
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

  const allWordsNode = Array.from(dom.allWords);

  // offsetTop 97, 207, 317, 427 
  // .remove()
  // .shift()
  function deleteOldWords() {
    if (currentOffsetTop >= 427) {
      for (let i = 0; allWordsNode[i].offsetTop <= 97; i++) {


      }
    }
  }

  if (event.key === "Backspace") {
    backspace();
    deleteOldWords();
    return;
  }
  
  if (event.key.length === 1) {
    handleTypingChar();
    deleteOldWords();
    return;
  }
};

export { typingLogic };