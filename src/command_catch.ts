import { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }
  const pokemon_name = args[0];
  console.log(`Throwing a Pokeball at ${pokemon_name}...`);
  const pokemon = (await state.pokiapi.fetchPokemon(pokemon_name)) as Pokemon;
  const baseExperience = pokemon.base_experience;
  const randomValue = Math.random() * baseExperience;
  if (randomValue > baseExperience / 2) {
    console.log(`${pokemon.name} escaped!`);
  } else {
    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
  }
}
