export const isNumber = (argument: unknown): boolean =>
  !isNaN(Number(argument));
