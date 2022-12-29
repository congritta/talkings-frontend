export function generateHex(length: number) {
  let hex = "";

  for(let i = 0; i < length; i++) {
    hex += randomNumber(0, 15).toString(16);
  }

  return hex;
}

export const asyncSleep = (ms: number) =>
  new Promise((resolve) => {setTimeout(resolve, ms);});

export function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
