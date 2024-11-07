// All export inside /utils is automaticaly import inside components

export function sleep(milliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
