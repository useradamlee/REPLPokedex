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

export async function startREPL() {
  const state = initState();

  state.readline.prompt();

  let cleaned_input: string[] = [];

  state.readline.on("line", async (input) => {
    cleaned_input = cleanInput(input);
    const commandName = cleaned_input[0];
    const command = state.commands[commandName];
    if (command) {
      try {
        await command.callback(state, ...cleaned_input.slice(1));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Unknown command");
    }
    state.readline.prompt();
  });
}
