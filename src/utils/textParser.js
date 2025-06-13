function matchText(text) {
  return text.match(/\S+|\s+/g).map((element) => element.replace(/ /g, "\u00A0"));
}

let defaultText = "123 All visuals and music";
//All visuals and music in this video are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.
let words = matchText(defaultText);

function separatedWordsSpaces(text = null) {
  if (text || text === 0) {
    text = String(text);
    return matchText(text);
  }

  return words;
}

function newDefaultText(text) {
  defaultText = text;
}

export { separatedWordsSpaces, newDefaultText };