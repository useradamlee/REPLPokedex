// import { exit } from "process";
import readline from "readline";
import { getCommands } from "./commands.js";

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
  let cleaned_input: string[] = [];
  rl.on("line", (input) => {
    cleaned_input = cleanInput(input);
    const commands = getCommands();
    const commandName = cleaned_input[0];
    const command = commands[commandName];
    if (command) {
      try {
        command.callback(commands);
        rl.prompt();
      } catch (err) {
        console.log(err);
        rl.prompt();
      }
    } else {
      console.log("Unknown command");
    }
  });
}
