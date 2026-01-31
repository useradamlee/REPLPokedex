import { State } from "./state.js";
import { type Pokemon } from "./pokeapi.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a Pokemon name");
  }
  const pokemonName = args[0];
  console.log(`Looking up ${pokemonName}...`);
  if (pokemonName in state.pokedex) {
    console.log(`Name: ${pokemonName}`);
    const pokemonInfo: Pokemon = state.pokedex[pokemonName];
    console.log(`Height: ${pokemonInfo.height}`);
    console.log(`Weight ${pokemonInfo.weight}`);
    console.log("Stats: ");
    for (const statInfo of pokemonInfo.stats) {
      console.log(` - ${statInfo.stat.name}: ${statInfo.base_stat}`);
    }
    console.log("Types: ");
    for (const typeInfo of pokemonInfo.types) {
      console.log(` - ${typeInfo.type.name}`);
    }
  } else {
    console.log("you have not caught that pokemon");
  }
}
