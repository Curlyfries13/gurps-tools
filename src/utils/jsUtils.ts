export function ensureFound<T>(
  op: T | undefined | null,
  errorMessage: string = 'The requested element is not found.'
): T {
  if (op === undefined || op === null) {
    throw new TypeError(errorMessage);
  }
  return op;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function debounce<T extends Function>(callback: T, wait = 20) {
  let h = 0;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => callback(...args), wait);
  };
  return <T>(<any>callable);
}

export const numberPattern = /^\d{1,9}$/m;
