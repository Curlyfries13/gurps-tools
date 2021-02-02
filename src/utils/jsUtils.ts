export function ensureFound<T>(
  op: T | undefined | null,
  errorMessage: string = 'The requested element is not found.'
): T {
  if (op === undefined || op === null) {
    throw new TypeError(errorMessage);
  }
  return op;
}
