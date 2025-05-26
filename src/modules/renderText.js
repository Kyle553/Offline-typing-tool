import { textParser } from "./textParser.js";

const words = textParser();
const target_charDOM = document.getElementById("target_char");

function renderText() {
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
};

renderText(words);

export { renderText };