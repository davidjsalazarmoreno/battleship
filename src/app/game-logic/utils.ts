// Source: https://stackoverflow.com/a/2117523/9259227
export function uuidv4() {
  const placeholder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return placeholder.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// https://stackoverflow.com/questions/34937349/javascript-create-empty-array-of-a-given-size
export function range(
  size: number,
  startAt: number = 0,
): ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}
