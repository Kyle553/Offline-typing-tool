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

function loremGenerator(num) {
  const defaultLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  const words = defaultLorem.match(/\S+/g);

  let templorem = null;
  let lorem = [];
  let rndNum = null;

  for (let i = 0; i < num; i++) {
    rndNum = Math.floor(Math.random() * words.length);
    
    lorem.push(words[rndNum]);
    
    // if (lorem[i] === lorem[i - 1]) {

    // }

    if (i === 0) {
      templorem = lorem[i];
    }
    
    if (i > 1 && i < num - 1) {
      templorem = lorem[i - 1]
    }

    // Зробити перший символ першого слова великим
    if (lorem[0][0] === lorem[0][0].toLowerCase()) {
      lorem[0] = lorem[0][0].toUpperCase() + lorem[0].slice(1);
    }

    // Додати в кінці крапку
    if (i === (num - 1) && lorem[i].at(-1) !== "." ) {
      lorem[i] = lorem[i] + ".";
    }
    
    // Замінити в кінці кому на крапку
    if (i === (num - 1) && (lorem[i].at(-1) === "," && lorem[i].at(-1) !== "." )) {
      lorem[i] = lorem[i].slice(0, -1) + ".";
    }
    
    // Додай крапку позаду якщо слово починається з великою
    if (lorem[i][0] === lorem[i][0].toUpperCase() && templorem.at(-1) !== "." && i > 0) {
      if (templorem.at(-1) !== ",") {
        lorem[i - 1] = lorem[i - 1] + ".";
      }
      
      if (templorem.at(-1) === ",") {
        lorem[i - 1] = lorem[i - 1].slice(0, -1) + ".";
      }
    }
    
    //Якщо позаду крапка заміни перший символ на великий
    if (templorem.at(-1) === "." && lorem[i][0] === lorem[i][0].toLowerCase()) {
      lorem[i] = lorem[i][0].toUpperCase() + lorem[i].slice(1);
    }
  }
  
  lorem = lorem.flatMap((word, index) => index === lorem.length - 1 ? word : [word, "\u00A0"]);

  return lorem;  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };