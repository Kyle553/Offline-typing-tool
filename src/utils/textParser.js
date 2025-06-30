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

  function randomIntBelow(num) {
    return Math.floor(Math.random() * num);
  }

  const defaultLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  const words = defaultLorem
    .toLowerCase()
    .replace(/[^\wа-яіїєґ']+/g, ' ') 
    .trim()
    .split(/\s+/);

  let previousWord = null;
  let cleanPreviousWord = null;
  let lorem = [];

  for (let i = 0; i < num; i++) {
    const randomPunctuation = getRandomPunctuationOrNone();
    console.log(randomPunctuation);
    
    lorem.push(words[randomIntBelow(words.length)]);
    
    // Перший символ першого слова зробити великим і перейди -ДО НАСТУПНОГО ЦИКЛУ-
    if (i === 0) {
      lorem[0] = lorem[0][0].toUpperCase() + lorem[0].slice(1);
      continue;
    }
    
    if (i > 0 && i < (num - 1)) {
      previousWord = lorem[i - 1]
      cleanPreviousWord = previousWord.replace(/[.,!?()":\-]/g, "").toLowerCase();
    }

    while (i > 0 && lorem[i] === cleanPreviousWord) {
      lorem[i] = words[randomIntBelow(words.length)];
    }


    // переписати [".", "!", "?", ")", `"`] в щось нормальне з одним масивом


    // .toUpperCase()
    // Якщо попереднє слово закінчилось ".", "!", "?" зроби перший символ слова великим
    if ([".", "!", "?"].includes(previousWord.at(-1))) {
      lorem[i] = lorem[i][0].toUpperCase() + lorem[i].slice(1);
    }

    // Cимволи в кінець останнього слова ".", "!", "?"
    // Додати до останнього слова в кінець рандомну закінчувальну пунктуацію і перейди -ДО НАСТУПНОГО ЦИКЛУ-
    if (i === (num - 1)) {
      lorem[i] = lorem[i] + [".", "!", "?"][randomIntBelow(3)];
      continue;
    }

    // Cимволи ".", "!", "?", ","
    // Додай в кінець слова символ з randomPunctuation якщо хоч 1 символом співпадає зі списку ".", "!", "?", ","
    if ([".", "!", "?", ","].includes(randomPunctuation)) {
      lorem[i] = lorem[i] + randomPunctuation;
    }
    
    // Cимвол "" або ()
    //Якщо попереднє слово не закінчувалось на ".", "!", "?", ")", `"`" постав слово в "" або ()
    if ([`"`, "()"].includes(randomPunctuation) && ![".", "!", "?", ")", `"`].includes(previousWord.at(-1))) {
      if (randomPunctuation === "()") {
        lorem[i] = "(" + lorem[i] + ")";
      } else {
        lorem[i] = `"` + lorem[i] + `"`;
      }
    }
    
    // Символ -
    // Якщо попереднє слово не закінчувалось на ".", "!", "?", ",", ")", `"`, ":" поєднай попереднє слово з теперішнім через тире
    if (randomPunctuation === `-` && ![".", "!", "?", ",", ")", `"`, ":" ].includes(previousWord.at(-1))) {
      let leftWord = words[randomIntBelow(words.length)];
      let rightWord = lorem[i];

      while (leftWord === cleanPreviousWord) {
        leftWord = words[randomIntBelow(words.length)];
      }

      // Тут немає перевірки rightWord на дублікати тому що lorem[i] перевіряється на дублікати в рядку 108

      lorem[i] = leftWord + "-" + rightWord;
    }
  }
  
  //напевно це переписати по іншому
  lorem = lorem.flatMap((word, index) => index === lorem.length - 1 ? word : [word, "\u00A0"]);

  return lorem;  
}

export { separatedWordsSpaces, newDefaultText, loremGenerator };