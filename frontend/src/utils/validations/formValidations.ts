export const digitRegex = /^(?=.*[0-9])\d*$/;
export const URLRegex = /^(https?:\/\/)?([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/i;

export const numberRules = [
  (v: string) =>
    (v !== "" && /^\d+$/.test(v)) || "Value must be a non-empty number",
];

export const stringRules = (fieldName: string) => [
  (value: string) => {
    if (value) return true;
    return `${fieldName} is required`;
  },
];

export const URLRules = [
  (value: string) => {
    if (URLRegex.test(value)) return true;
    return "Field must be a valid URL";
  },
];

export const emptyURLRules = [
  (value: string) => {
    if (!value) return true;
    if (URLRegex.test(value)) return true;
    return "Field must be a valid URL";
  },
];
