function setClassDOM( elementDOM, classes ) {
  classes = Array.isArray(classes) ? classes : [classes];

  for (let element of classes) {
    if (typeof element !== "string") {
      element = `"${element}"`;
    }

    const hasClass = elementDOM.classList.contains(element);

    if (hasClass) {
      elementDOM.classList.remove(element);
    } else {
      elementDOM.classList.add(element);
    }
  }
}

export { setClassDOM };