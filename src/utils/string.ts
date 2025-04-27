export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const insert = (array: string[], index: number, ...items: string[]) => {
  return array.splice(index, 0, ...items);
};
