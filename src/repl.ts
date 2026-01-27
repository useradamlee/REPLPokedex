// import { exit } from "process";
import { initState } from "./state.js";

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
  const state = initState();

  state.readline.prompt();
  let cleaned_input: string[] = [];
  state.readline.on("line", (input) => {
    cleaned_input = cleanInput(input);
    const commandName = cleaned_input[0];
    const command = state.commands[commandName];
    if (command) {
      try {
        command.callback(state);
        state.readline.prompt();
      } catch (err) {
        console.log(err);
        state.readline.prompt();
      }
    } else {
      console.log("Unknown command");
    }
  });
}
