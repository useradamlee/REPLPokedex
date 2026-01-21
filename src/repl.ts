export function cleanInput(input: string): string[] {
  const split_text = input.split(" ");
  let cleaned_text: string[] = [];
  for (let i = 0; i < split_text.length; i++) {
    if (split_text[i]) {
      cleaned_text.push(split_text[i].toLowerCase());
    }
  }
  return cleaned_text;
}
