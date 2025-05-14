const text = "123 All visuals and music in this video";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
const words = text.match(/\S+|\s+/g)
words.forEach((element, index, arr) => {
  arr[index] = element.replace(/ /g, "\u00A0");
});
console.log(words)
let wordIndex = 0;
let charIndex = 0;
let totalChars = 0;

const target_charDOM = document.getElementById("target_char");

(() => {
  for (let element of words) {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("word");
    target_charDOM.appendChild(createdDiv);

    for (let char of element) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = char;
      createdDiv.appendChild(createdSpan);
    }
  }
})();



for (let element of words) {
  totalChars += element.length;
}

// target_charDOM.focus();
// замінити click на focus
target_charDOM.addEventListener("click", () => {
  //замінити document на target_charDOM
  document.addEventListener("keydown", typingText);
});


function typingText(event) {
  const allWordsDOM = document.querySelectorAll(".word");
  let currentWordDOM = allWordsDOM[wordIndex];
  const allCharsDOM = currentWordDOM.querySelectorAll("span");
  let currentCharDOM = allCharsDOM[charIndex];

  let currentWord = words[wordIndex];
  // console.log(charIndex)

  if (event.key === "Backspace") {
    backspace();
    return;
  }

  if (event.key.length === 1) {
    clas();
    return;
  }

  function backspace() {
    if (charIndex === 0 && wordIndex > 0) {

      wordIndex -= 1;
      currentWord = words[wordIndex];

      charIndex = currentWord.length - 1;
      return;
    }

    if (charIndex > 0) {
      if (charIndex === currentWord.length - 1) {
        currentCharDOM.classList.remove("correct", "incorrect");
        currentCharDOM.classList.length === 0 ? charIndex -= 1 : null;
        return;
      }

      currentCharDOM = allCharsDOM[charIndex];
      currentCharDOM.classList.remove("correct", "incorrect");
      charIndex > 0 ? charIndex -= 1 : null;
    }
  };
  
  // function clas() {
  //   if (charIndex <= (currentWord.length - 1)) {
  //     const className = currentWord[charIndex] === event.key ? "correct" : "incorrect";
  //     currentCharDOM.classList.add(className);
  //     if (charIndex < (currentWord.length - 1)) {
  //       charIndex += 1;
  //       return;
  //     }

  //     if (wordIndex === (words.length - 1)) {
  //       wordIndex += 1;
  //       charIndex = 0;
  //     }
  //   } 
  // };
}