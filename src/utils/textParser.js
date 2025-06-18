function matchText(text) {
  return text.match(/\S+|\s+/g).map((element) => element.replace(/ /g, "\u00A0"));
}

let defaultText = "123 All visuals and music in this video are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations for our audience to enjoy.";
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


// пілся кожного слова, пробіл
// видалити лишні слова\пробіли з масиву
// не починається з пробілів, ком і не закінчується

function loremGenerator(num) {
  const defaultLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  const words = defaultLorem.match(/\S+/g);

  let templorem = null;
  let lorem = [];
  let rndNum = null;

  for (let i = 0; i < num; i++) {
    rndNum = Math.floor(Math.random() * words.length);
    
    lorem.push(words[rndNum]);

    // if (i > 1 && i < (num - 1)) {
    //   templorem = lorem[i - 2];
    //   console.log(templorem)
    // } else {
    //   templorem = lorem[i];
    // }

    if ((i > 0 && i < (num - 1)) ) {
      lorem.push("\u00A0");
    }



    
  }
  
  console.log(lorem);
  return lorem;
  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };