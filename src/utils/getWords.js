let defaultText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, praesentium ipsum officia quod, voluptatibus reprehenderit est quasi commodi quae neque officiis nam beatae labore repellendus quidem eveniet quisquam inventore! Repellat!";

function getWords(text = null) {
  function matchText(text) {
    return text.match(/\S+|\s+/g).map((element) => element.replace(/ /g, "\u00A0"));
  }

  let words = null
  if (text || text === 0) {
    text = String(text);
    return matchText(text);
  } else {
    words = matchText(defaultText);
  }
  
  return words;
}

function setDefaultText(text) {
  defaultText = text;
}

export { getWords, setDefaultText };