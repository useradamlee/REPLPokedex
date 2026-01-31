import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { stat } from "fs/promises";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokiapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
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
    explore: {
      name: "explore",
      description: "Explores a certain specified location",
      callback: async (state: State, ...args: string[]): Promise<void> => {
        commandExplore(state, ...args);
      },
    },
    catch: {
      name: "catch",
      description: "Catch a specified pokemon",
      callback: async (state: State, ...args: string[]): Promise<void> => {
        commandCatch(state, ...args);
      },
    },
    inspect: {
      name: "inspect",
      description: "Inspects a pokemon registered in your pokedex",
      callback: async (state: State, ...args: string[]): Promise<void> => {
        commandInspect(state, ...args);
      },
    },
    pokedex: {
      name: "pokedex",
      description: "Lists all the pokemon registered in your pokedex",
      callback: async (state: State): Promise<void> => {
        commandPokedex(state);
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
    pokedex: {},
    nextLocationsURL: undefined,
    prevLocationsURL: undefined,
  };
}
