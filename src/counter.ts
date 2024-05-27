const MAX_PRIME_NUMBER_UNDER_10K = 9973

export function rabinKarpAlgorithm(text: string, pattern: string, countCollisions = false, mod = MAX_PRIME_NUMBER_UNDER_10K): number[] | number {
  const result = [];
  let collisions = 0;

  const alphabetSize = 256;

  let patternHash = pattern.charCodeAt(0) % mod;
  let textHash = text.charCodeAt(0) % mod;

  let firstIndexHash = 1;

  for(let i = 1; i < pattern.length; i++)
  {
    patternHash *= alphabetSize;
    patternHash += pattern.charCodeAt(i);
    patternHash %= mod;

    textHash *= alphabetSize;
    textHash += text.charCodeAt(i);
    textHash %= mod;

    firstIndexHash *= alphabetSize;
    firstIndexHash %= mod;
  }

  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (patternHash === textHash) {
      if (compareText(text, i, pattern)) {
        result.push(i);
      } else {
        collisions++;
      }
    }

    if (i === text.length - pattern.length) break;

    textHash -= (text.charCodeAt(i) * firstIndexHash) % mod;
    textHash += mod;
    textHash *= alphabetSize;
    textHash += text.charCodeAt(i + pattern.length);
    textHash %= mod;
  }

  return countCollisions ? collisions : result;
}

function compareText(text: string, index: number, pattern: string): boolean {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] !== text[index + i]) {
      return false;
    }
  }

  return true;
}