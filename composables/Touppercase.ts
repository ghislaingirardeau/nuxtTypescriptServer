type StringUpperCase = string;

export function useToUpperCase2(text: StringUpperCase): StringUpperCase {
  return text.toLocaleUpperCase();
}
