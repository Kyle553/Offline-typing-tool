function getLoremWords(num) {
  function getRandomPunctuationOrNone() {
    // Шанси в відсотках
    const punctuationsChance = {
      comma: {
        chance: 7,       
        symbol: ","
      },
      period: {
        chance: 4,
        symbol: "."
      },
      doubleQuotes: {
        chance: 2,
        symbol: '"'
      },
      hyphen: {
        chance: 1,
        symbol: "-"
      },
      questionMark: {
        chance: 0.6,
        symbol: "?"
      },
      exclamationMark: {
        chance: 0.5,
        symbol: "!"
      },
      colon: {
        chance: 0.4,
        symbol: ":"
      },
      brackets: {
        chance: 0.3,
        symbol: "()"
      }
    };

    let result = null;

    // Повертає останнє true
    for (const [key, {chance, symbol}] of Object.entries(punctuationsChance)) {
      const isTrue = Math.random() < (chance / 100)
      if (isTrue) result = symbol;
    }

    if (result === null) noPunctuationCount++;

    // Якщо 8 раз повертає null, поверни випадковий знак пунктуації
    if (noPunctuationCount === 8 && result === null) {
      noPunctuationCount = 0;
      const punctuations = Object.values(punctuationsChance).map(obj => obj.symbol)
      const randomPunctuation = punctuations[randomIntBelow(8)]

      return randomPunctuation
    }

    return result;
  }

  function randomIntBelow(num) {
    return Math.floor(Math.random() * num);
  }

  const defaultLorem = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum"
  const words = defaultLorem
    .replace(/[^\w]+/g, ' ')
    .split(/\s+/);

  let noPunctuationCount = 0;
  let previousWord = null;
  let cleanPreviousWord = null;
  let loremWords = [];

  const punctuationsFiltersFor = {
    quotesAndBrackets: [".", "!", "?", ")", '"', ":"],
    hyphen: [".", "!", "?", ",", ")", '"', ":"]
  };

  const punctuationSearch = {
    quotesAndBrackets: ['"', "()"],
    endOrSeparator: [".", "!", "?", ",", ":"]
  };

  for (let i = 0; i < num; i++) {
    const randomPunctuation = getRandomPunctuationOrNone();
    
    loremWords.push(words[randomIntBelow(words.length)]);
    
    // Перший символ першого слова зробити великим і перейди -ДО НАСТУПНОГО ЦИКЛУ-
    if (i === 0) {
      loremWords[0] = loremWords[0][0].toUpperCase() + loremWords[0].slice(1);
      continue;
    }
    
    if (i > 0 && i < (num - 1)) {
      previousWord = loremWords[i - 1]
      cleanPreviousWord = previousWord.replace(/[.,!?()":\-]/g, "").toLowerCase();
    }

    while (i > 0 && loremWords[i] === cleanPreviousWord) {
      loremWords[i] = words[randomIntBelow(words.length)];
    }

    // .toUpperCase()
    // Якщо попереднє слово закінчилось ".", "!", "?" зроби перший символ слова великим
    if ([".", "!", "?"].includes(previousWord.at(-1))) {
      loremWords[i] = loremWords[i][0].toUpperCase() + loremWords[i].slice(1);
    }

    // Cимволи в кінець останнього слова ".", "!", "?"
    // Додати до останнього слова в кінець рандомну закінчувальну пунктуацію і перейди -ДО НАСТУПНОГО ЦИКЛУ-
    if (i === (num - 1)) {
      loremWords[i] = loremWords[i] + [".", "!", "?"][randomIntBelow(3)];
      continue;
    }

    // Cимволи ".", "!", "?", ",", ":"
    // Додай в кінець слова символ з randomPunctuation якщо хоч 1 символом співпадає зі списку ".", "!", "?", ",", ":"
    if (punctuationSearch.endOrSeparator.includes(randomPunctuation)) {
      loremWords[i] = loremWords[i] + randomPunctuation;
    }
    
    // Cимвол "" або ()
    //Якщо попереднє слово не закінчувалось на ".", "!", "?", ")", '"'", ":" постав слово в "" або ()
    if (
      punctuationSearch.quotesAndBrackets.includes(randomPunctuation) 
      && !punctuationsFiltersFor.quotesAndBrackets.includes(previousWord.at(-1))
    ) {
      if (randomPunctuation === "()") {
        loremWords[i] = "(" + loremWords[i] + ")";
      } else {
        loremWords[i] = '"' + loremWords[i] + '"';
      }
    }
    
    // Символ -
    // Якщо попереднє слово не закінчувалось на ".", "!", "?", ",", ")", '"', ":" поєднай попереднє слово з теперішнім через тире
    if (
      randomPunctuation === `-` 
      && !punctuationsFiltersFor.hyphen.includes(previousWord.at(-1))
    ) {
      let leftWord = words[randomIntBelow(words.length)];
      let rightWord = loremWords[i];

      while (leftWord === cleanPreviousWord) {
        leftWord = words[randomIntBelow(words.length)];
      }

      // Тут немає перевірки rightWord на дублікати тому що loremWords[i] перевіряється на дублікати в рядку 108

      loremWords[i] = leftWord + "-" + rightWord;
    }
  }
  
  loremWords = loremWords.flatMap((word, index) => index < (loremWords.length - 1) ? [word, "\u00A0"] : word);

  return loremWords;  
}

export { getLoremWords };