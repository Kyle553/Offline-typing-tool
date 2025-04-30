const text = "All visuals and music in this video are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.";
const currentIndex = 0;
// let typedChar = "";

(function renderText ( text ) {
  let words = [];
  words = text.trim().split(/\s+/);
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].split("");
  }
  console.log(words);


  words.forEach((element, index) => {
    const createdDiv = document.createElement("div");
    console.log(element);
    
    for (let i = 0; i < element.length; i++) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = element[i];
      createdDiv.appendChild(createdSpan);
    }


    const target_char = document.getElementById("target_char");
    target_char.appendChild(createdDiv);

  });
})(text);







// document.addEventListener("keydown", (event) => {

// });

