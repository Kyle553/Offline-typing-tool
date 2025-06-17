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
  const words = matchText(defaultLorem);

  let templorem = null;
  let lorem = [];
  let rndNum = null;

  for (let i = 0; i < num; i++) {
    rndNum = Math.floor(Math.random() * ((words.length - 1) - 0) + 0);
    
    lorem.push(words[rndNum]);
    
    if (i > 0) {
      templorem = lorem[i - 1];
    } else {
      templorem = lorem[i];
    }
    
    // if (lorem[i] === "\u00A0") {
    //   num++;
    //   continue;
    // }
    // console.log(templorem);

    // // якщо попередній символ це пробіл і новий теж пробіл, пропусти його
    // if (templorem === "\u00A0" && lorem[i] === "\u00A0") {
    //   lorem.splice(i, 1);
    //   i--;
    //   num++;
    //   console.log("111")
    //   continue
    // }
    
    //якщо перше слово не велике, зроби великим
    if (i === 0 && lorem[0][0] !== lorem[0][0].toUpperCase()) {
      lorem[0] = lorem[0][0].toUpperCase() + lorem[0].slice(1);
    }
    
    // якщо слово починалось з великої або закінчувалось комою в кінці а нове слово з великої, зроби перший символ маленькою 
    if (
      (templorem[0] === templorem[0].toUpperCase() && lorem[i][0] === lorem[i][0].toUpperCase())
      || (templorem.at(-1) === "," && lorem[i][0] === lorem[i][0].toUpperCase())
    ) {
      lorem[i] = lorem[i][0].toLowerCase() + lorem[i].slice(1);
    }
    
    // якщо була крапка і слово не велике, зроби великим
    if (templorem.at(-1) === "." && lorem[i][0] === lorem[i][0].toLowerCase()) {
      lorem[i] = lorem[i][0].toUpperCase() + lorem[i].slice(1);
    }
    
  }
  
  console.log(lorem);
  return lorem;
  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };