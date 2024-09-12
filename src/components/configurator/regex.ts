export const hslValuesSeparator = /\D+/g;

export const importMatchSelector = (lookupValue: string): RegExp => {
  return new RegExp(`${lookupValue}: (.+);`);
};
