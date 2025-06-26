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

    let result = null;
    // повертає останнє true
    for (const [key, {chance, symbol}] of Object.entries(punctuationsChance)) {
      const isTrue = Math.random() < (chance / 100)
      if (isTrue) {
        result = symbol;
      }
    }

    return result === undefined ? null : result;
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
    const rndPunctuation = getRandomPunctuationOrNone();
    console.log(rndPunctuation);
    

    lorem.push(words[rndNum]);
    
    while (i > 0 && lorem[i] === lorem[i - 1]) {
      rndNum = Math.floor(Math.random() * words.length);
      lorem[i] = words[rndNum];
    }

    if (i === 0) {
      previousWord = lorem[i];
    }
    
    if (i > 0 && i < num - 1) {
      previousWord = lorem[i - 1]
    }

    // Перший символ першого слова зробити великим
    if (i === 0) {
      lorem[0] = lorem[0][0].toUpperCase() + lorem[0].slice(1);
      continue;
    }

    // Додати до останнього слова в кінець крапку
    if (i === (num - 1)) {
      lorem[i] = lorem[i] + ".";
    }

    // ЗРОБИТИ ДЛЯ : ІНШУ УМОВУ ===============================================================
    if ([".", ",", "?", "!"].includes(rndPunctuation)) {
      lorem[i] = lorem[i] + rndPunctuation;
    }

    //Якщо попереднє слово не закінчувалось на ".", "!", "?", ")" постав слово в подвійні лапки ""
    if (rndPunctuation === `"` && ![".", "!", "?", "()"].includes(previousWord.at(-1))) {
      lorem[i] = `"` + lorem[i] + `"`;
    }

    //Якщо попереднє слово не закінчувалось на ".", "!", "?", ")", `"` поєднай попереднє слово з теперішнім через тире
    if (rndPunctuation === `-` && ![".", "!", "?", ")", `"` ].includes(previousWord.at(-1))) {
      lorem[i] = previousWord + "-" + lorem[i];
    }

    // Якщо попереднє слово закінчилось ".", "!", "?" зроби перший символ слова великим
    if ([".", "!", "?"].includes(previousWord.at(-1))) {
      lorem[i] = lorem[i][0].toUpperCase() + lorem[i].slice(1);
    }
  }
  
  //напевно це переписати по іншому
  lorem = lorem.flatMap((word, index) => index === lorem.length - 1 ? word : [word, "\u00A0"]);

  return lorem;  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };