function isString(isString) {
  !Array.isArray(isString) ? isString = [isString] : null ;

  for (let i = 0; i < isString.length; i++) {
    if (typeof isString[i] !== "string") {
      isString[i] = `"${isString[i]}"`;
    }
  }

  return isString;
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

function containsClasses(elementDOM, classes) {
  classes = isString(classes);

  for (const element of classes) {
    const isTrue = elementDOM.classList.contains(element);

    if (isTrue) return true;
  }

  return false;
}

export { setClasses, containsClasses };