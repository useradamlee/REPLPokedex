import { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }
  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);
  const location = (await state.pokiapi.fetchLocation(
    locationName,
  )) as Location;
  const pokemon_Encounters = location.pokemon_encounters;
  console.log("Found Pokemon:");
  for (const pokemon of pokemon_Encounters) {
    console.log(` - ${pokemon.pokemon.name}`);
  }
}
