import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokiapi: PokeAPI;
  nextLocationsURL: string | undefined;
  prevLocationsURL: string | undefined;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: async (state: State): Promise<void> => {
        commandExit(state);
      },
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: async (state: State): Promise<void> => {
        commandHelp(state);
      },
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: async (state: State): Promise<void> => {
        commandMap(state);
      },
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: async (state: State): Promise<void> => {
        commandMapb(state);
      },
    },
  };
}

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  return {
    readline: rl,
    commands: getCommands(),
    pokiapi: new PokeAPI(50000),
    nextLocationsURL: undefined,
    prevLocationsURL: undefined,
  };
}
