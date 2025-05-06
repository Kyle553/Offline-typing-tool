const text = "123 All visuals and music in this video ";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
let charIndex = 0;
let wordIndex = 0;
let words = text.trim().split(/\s+/);

const target_char = document.getElementById("target_char");

(function renderText () {
  for (let element of words) {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("word");
    target_char.appendChild(createdDiv);

    for (let char of element) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = char;
      createdDiv.appendChild(createdSpan);
    }
  }
})();


// target_char.focus();
// замінити click на focus
target_char.addEventListener("click", () => { 
  //замінити document на target_char
  document.addEventListener("keydown", typingText);
});

function typingText (event) {
  const allWords = document.querySelectorAll(".word");
  const currentWord = allWords[wordIndex];
  const allChar = currentWord.querySelectorAll("span");
  let currentSpan = allChar[charIndex];

  let lastChar = null;
  let lastWord = null;

  if (event.key === " " && wordIndex < (words.length - 1)) {
    wordIndex += 1;
    charIndex = 0;
    lastChar = charIndex;
    lastWord = wordIndex;
    return;
  } 

  // if (lastWord === words[wordIndex - 1] && lastChar !== words[wordIndex - 1].at(-1))
  if (event.key === "Backspace") {
    if (charIndex === 0 && wordIndex > 0) {
      wordIndex -= 1;
      charIndex = words[wordIndex].length;
      return;
    } 
    
    if (charIndex > 0) {  
      charIndex -= 1;
      currentSpan = allChar[charIndex];
      currentSpan.classList.remove("correct", "incorrect");
      return;
    }
  }

  if (event.key.length !== 1) {
    return;
  }

  if (charIndex < words[wordIndex].length) {
      const className = words[wordIndex][charIndex] === event.key ? "correct" : "incorrect"
      currentSpan.classList.add(className);
      charIndex += 1;
      return;
  }
  // currentWordDOM, currentSpanDOM, currentWord
}
