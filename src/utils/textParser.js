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

// =========================================================================================
function loremGenerator(num) {
  function getRandomPunctuationOrNone() {
    // Шанси в відсотках
    const punctuationsChance = {
      comma: {
        chance: 7,       
        symbol: ','      
      },
      period: {
        chance: 4,
        symbol: '.'
      },
      doubleQuotes: {
        chance: 2,
        symbol: '"'
      },
      hyphen: {
        chance: 1,
        symbol: '-'
      },
      questionMark: {
        chance: 0.6,
        symbol: '?'
      },
      exclamationMark: {
        chance: 0.5,
        symbol: '!'
      },
      colon: {
        chance: 0.4,
        symbol: ':'
      },
      brackets: {
        chance: 0.3,
        symbol: '()'
      }
    };

    for ([key, {chance, symbol}] of Object.entries(punctuationsChance)) {

    }






  }

  const defaultLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  const words = defaultLorem
    .toLowerCase()
    .replace(/[^\wа-яіїєґ']+/g, ' ') 
    .trim()
    .split(/\s+/);

  let previousWord = null;
  let lorem = [];
  let rndNum = null;

  for (let i = 0; i < num; i++) {
    rndNum = Math.floor(Math.random() * words.length);

    lorem.push(words[rndNum]);
    
    while (i > 0 && lorem[i] === lorem[i - 1]) {
      rndNum = Math.floor(Math.random() * words.length);
      lorem[i] = words[rndNum];
    }

    if (i === 0) {
      previousWord = lorem[i];
    }
    
    if (i > 1 && i < num - 1) {
      previousWord = lorem[i - 1]
    }

// зробити рандомні крапки і коми

    // // Зробити перший символ першого слова великим
    // if (lorem[0][0] === lorem[0][0].toLowerCase()) {
    //   lorem[0] = lorem[0][0].toUpperCase() + lorem[0].slice(1);
    // }

    // // Додати в кінці крапку
    // if (i === (num - 1) && lorem[i].at(-1) !== "." ) {
    //   lorem[i] = lorem[i] + ".";
    // }
    
    // // Замінити в кінці кому на крапку
    // if (i === (num - 1) && (lorem[i].at(-1) === "," && lorem[i].at(-1) !== "." )) {
    //   lorem[i] = lorem[i].slice(0, -1) + ".";
    // }
    
    // // Додай крапку позаду якщо слово починається з великою
    // if (lorem[i][0] === lorem[i][0].toUpperCase() && previousWord.at(-1) !== "." && i > 0) {
    //   if (previousWord.at(-1) !== ",") {
    //     lorem[i - 1] = lorem[i - 1] + ".";
    //   }
      
    //   if (previousWord.at(-1) === ",") {
    //     lorem[i - 1] = lorem[i - 1].slice(0, -1) + ".";
    //   }
    // }
    
    // //Якщо позаду крапка заміни перший символ на великий
    // if (previousWord.at(-1) === "." && lorem[i][0] === lorem[i][0].toLowerCase()) {
    //   lorem[i] = lorem[i][0].toUpperCase() + lorem[i].slice(1);
    // }
  }
  
  //напевно це переписати по іншому
  lorem = lorem.flatMap((word, index) => index === lorem.length - 1 ? word : [word, "\u00A0"]);

  return lorem;  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };