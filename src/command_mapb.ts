import { State } from "./state.js";
import { type ShallowLocations } from "./pokeapi.js";

export async function commandMapb(state: State): Promise<void> {
  const prevLocationsURL = state.prevLocationsURL;
  if (!prevLocationsURL) {
    console.log("you're on the first page");
  } else {
    const locations = (await state.pokiapi.fetchLocations(
      prevLocationsURL,
    )) as ShallowLocations;
    for (const loc of locations.results) {
      console.log(loc.name);
    }
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;
  }
}
