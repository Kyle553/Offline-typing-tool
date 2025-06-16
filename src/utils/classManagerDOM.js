function isString(isString) {
  Array.isArray(isString) ? null : isString = [isString] ;

  return isString.map(element => typeof element === "string" ? element : `"${element}"`);
}

function setClasses(elementDOM, classes) {
  classes = isString(classes);

  for (let element of classes) {
    const hasClass = elementDOM.classList.contains(element);

    if (hasClass) {
      elementDOM.classList.remove(element);
    } else {
      elementDOM.classList.add(element);
    }
  }
}

function isCorrect(currentChar) {
  return currentChar.classList.contains("correct") ? "correct" : "incorrect";
}

export { setClasses, isCorrect };