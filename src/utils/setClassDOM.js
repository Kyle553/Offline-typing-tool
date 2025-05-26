function setClassDOM(elementDOM, classAdd = null, classRemove = null) {
  const applyClasses = (classes, action) => {
    if (classes !== null && Array.isArray(classes)) {
      for (const className of classes) {
        elementDOM.classList[action](className);
      }
    } else if (typeof classes === "string") {
      elementDOM.classList[action](classes);
    }
  };

  applyClasses(classAdd, "add");
  applyClasses(classRemove, "remove");
}

export { setClassDOM };