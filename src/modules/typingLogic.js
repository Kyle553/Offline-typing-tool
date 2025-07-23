import { setClasses, isCorrect} from "../utils/classManagerDOM.js";
import { isLastChar, isLastWord } from "../utils/isLastElement.js";

// let writtenWordsNodes = [];
// let writtenCharsNodes = [];

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

    // if (
    //   index.currentChar() === 0 
    //   && currentWord !== "\u00A0"
    //   && writtenWordsNodes.at(-1) === dom.currentWord
    // ) {
    //   writtenWordsNodes.pop();
    //   console.log(writtenWordsNodes)
    // }
  };
  
  function handleTypingChar() {
    let charStatusClass = "";

    if (
      isLastChar(words, index) && isLastWord(words, index) 
      && !dom.currentChar.classList.contains("word_active")
    ) {
      return;
    }

    typingStats.totalChars++;

    if (
      currentWord[index.currentChar()] === event.key
      || (event.key === " " && currentWord[index.currentChar()] === "\u00A0")
    ) {
      typingStats.correctChars++;
      charStatusClass = "correct";
    } else {
      typingStats.errorsCount++
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

    // if (currentWord !== "\u00A0" && writtenWordsNodes.at(-1) !== dom.currentWord) {
    //   const quotesAndBrackets = ['"', "()"];
    //   const endOrSeparator = [".", "!", "?", ",", ":"];
    //   let startIndex = 0;
    //   let expectedCorrectCharCount = 0;
    //   let countCorrectChars = 0;
    //   let isCharNodeWritten = writtenCharsNodes.some(node => node === dom.currentChar);

    //   if (quotesAndBrackets.includes(currentWord)) {
    //     startIndex = 1;
    //     expectedCorrectCharCount = currentWord.length - 2;
    //   } 
  
    //   if(endOrSeparator.includes(currentWord)) {
    //     expectedCorrectCharCount = currentWord.length - 1;
    //   }
  
    //   for (let i = startIndex; i < startIndex + expectedCorrectCharCount; i++) {
    //     if (dom.allChars[i].contains("correct")) {
    //       countCorrectChars++;
    //     }
    //   }
      
    //   if (countCorrectChars === expectedCorrectCharCount) {
    //     typingStats.correctWords++;
    //   }
  
    //   typingStats.totalWords++;
    //   writtenWordsNodes.push(dom.currentWord)
    //   console.log(writtenWordsNodes)
    // }

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