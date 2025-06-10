import { words } from "../utils/textParser.js";

const target_charDOM = document.getElementById("target_char");

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