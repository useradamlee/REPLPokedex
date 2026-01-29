import { State } from "./state.js";
import { type ShallowLocations } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
  const nextLocationURL = state.nextLocationsURL ?? undefined;
  const locations = (await state.pokiapi.fetchLocations(
    nextLocationURL,
  )) as ShallowLocations;
  for (const loc of locations.results) {
    console.log(loc.name);
  }
  state.prevLocationsURL = locations.previous;
  state.nextLocationsURL = locations.next;
}
