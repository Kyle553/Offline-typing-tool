function renderText(parental, words) {
  Array.isArray(words) ? null : words = [words];

  for (let element of words) {
    const createdDiv = document.createElement("div");
    createdDiv.classList.add("word");
    parental.appendChild(createdDiv);

    for (let char of element) {
      const createdSpan = document.createElement("span");
      createdSpan.textContent = char;
      createdDiv.appendChild(createdSpan);
    }
  }
}

export { renderText };