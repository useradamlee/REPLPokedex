import { exit } from "process";
import readline from "readline";

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

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (input) => {
    const cleaned_input = cleanInput(input);
    if (!input) {
      rl.prompt();
      exit();
    }
    console.log(`Your command was: ${cleaned_input[0]}`);
  });
}
