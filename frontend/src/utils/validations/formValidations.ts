export const digitRegex = /^(?=.*[0-9])\d*$/;

export const stringRules = (fieldName: string) => [
  (value: string) => {
    if (value) return true;
    return `${fieldName} is required`;
  },
];

export const numberRules = [
  (v: string) =>
    (v !== "" && /^\d+$/.test(v)) || "Value must be a non-empty number",
];
