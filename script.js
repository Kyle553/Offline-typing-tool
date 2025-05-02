const text = "All visuals and music in this video ";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
let charIndex = 0;
let wordIndex = 0;
let words = text.trim().split(/\s+/);
console.log(words);

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
  document.addEventListener("keydown", (event) => {
    const allWords = document.querySelectorAll(".word");
    const currentWord = allWords[wordIndex];
    const allChar = currentWord.querySelectorAll("span");
    const currentSpan = allChar[charIndex];

    if (event.key === " " && wordIndex < (words.length - 1)) {
      wordIndex += 1;
      charIndex = 0;
      return;
    } 

    // if (event.key === "Backspace") {
    //   if (charIndex === 0) {
    //     wordIndex -= 1;
    //     charIndex = words[wordIndex].length;
    //   } else {
    //     charIndex -= 1;
    //     currentSpan.classList.remove("correct", "incorrect");
    //     console.log(words[wordIndex][charIndex + 1]);
    //   }
    //   return;
    // }

    if (event.key.length !== 1) {
      return;
    }

    if (charIndex < words[wordIndex].length) {
      if (words[wordIndex][charIndex] === event.key ) {
        currentSpan.classList.add("correct");
        charIndex += 1;
        console.log("TAAAAAAAAAAAAK");
        console.log(words[wordIndex][charIndex]);
      } else {
        console.log("NIIIIIIIIIIIIIII");
        console.log(words[wordIndex][charIndex]);
        currentSpan.classList.add("incorrect");
        charIndex += 1;
      }
    }
  });
});



