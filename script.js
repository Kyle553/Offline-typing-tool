const text = "All visuals and music in this video ";
// are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
let charIndex = 0;
let wordIndex = 0;
let words = [];

const target_char = document.getElementById("target_char");

(function renderText ( text ) {
  words = text.trim().split(/\s+/);
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].split("");
  }
  console.log(words);


  words.forEach(( element ) => {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("word");
    target_char.appendChild(createdDiv);
    console.log(element);
    
    for (let i = 0; i < element.length; i++) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = element[i];
      createdDiv.appendChild(createdSpan);
    }
  });
})(text);

target_char.addEventListener("click", (event) => {
  const allWords = document.querySelectorAll(".word");
  console.log(words.length);
  console.log(allWords[2]);

  document.addEventListener("keyup", (event) => {
    const allWords = document.querySelectorAll(".word");
    const currentWordDiv = allWords[wordIndex];
    const charSpans = currentWordDiv.querySelectorAll("span");
    const currentSpan = charSpans[charIndex];

    if (event.key !== "Backspace") {
      if (event.key.length === 1) {
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
        } else {
          if (event.key === " ") {
            wordIndex += 1;
            charIndex = 0;
          } else {
  
          }
        }
      }
    } else {
      if (charIndex < (words[wordIndex].length + 1)) {
        charIndex -= 1;
        currentSpan.classList.remove("correct", "incorrect");
    
        console.log(words[wordIndex][charIndex + 1]);
      }
      
    }
  });
});

