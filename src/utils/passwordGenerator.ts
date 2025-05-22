// Ordem dos parâmetros: (length, uppercase, lowercase, numbers, symbols)

const symbols = "!@#$%&*";
const numbers = "0123456789";
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(str: string): string {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function generateFillerCharacters(
  count: number,
  options: {
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  }
): string {
  let all = "";
  if (options.includeUppercase) all += upper;
  if (options.includeLowercase) all += lower;
  if (options.includeNumbers) all += numbers;
  if (options.includeSymbols) all += symbols;

  let result = "";
  for (let i = 0; i < count; i++) {
    result += randomItem(all.split(""));
  }
  return result;
}

export async function generateSmartPassword(
  totalLength: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): Promise<string> {
  const options = {
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  };

  try {
    const nameRes = await fetch("https://randomuser.me/api/");
    const nameData = await nameRes.json();
    const name = nameData.results[0].name.first;

    const numberOfWords = 3;
    const wordsRes = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`
    );
    const words = (await wordsRes.json()) as string[];

    let baseWords = [name, ...words].join("");

    if (includeUppercase || includeLowercase) {
      baseWords =
        baseWords
          .match(/[a-z]+/gi)
          ?.map((word) => {
            if (includeUppercase && includeLowercase) {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else if (includeUppercase) {
              return word.toUpperCase();
            } else if (includeLowercase) {
              return word.toLowerCase();
            }
            return "";
          })
          .join("") || baseWords;
    } else {
      baseWords = "";
    }

    const requiredParts: string[] = [];

    if (includeNumbers) {
      requiredParts.push(randomItem(numbers.split("")));
    }
    if (includeSymbols) {
      requiredParts.push(randomItem(symbols.split("")));
    }

    let base = baseWords + requiredParts.join("");

    if (base.length > totalLength) {
      base =
        base.slice(0, totalLength - requiredParts.length) +
        requiredParts.join("");
    } else if (base.length < totalLength) {
      base += generateFillerCharacters(totalLength - base.length, options);
    }

    return shuffle(base);
  } catch (error) {
    console.error("Erro ao gerar senha:", error);
    return "Fallback@1234";
  }
}
