import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache;

  constructor(interval: number) {
    this.#pokeCache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const data: Promise<ShallowLocations> = this.#pokeCache.get(fullURL);
    if (data != undefined) {
      return data;
    }
    const response = await fetch(fullURL, {
      method: "GET",
      mode: "cors",
    });
    const locations_data: Promise<ShallowLocations> = response.json();
    this.#pokeCache.add(fullURL, locations_data);
    return locations_data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}/`;
    const data: Promise<Location> = this.#pokeCache.get(fullURL);
    if (data != undefined) {
      return data;
    }
    const response = await fetch(fullURL, {
      method: "GET",
      mode: "cors",
    });
    const location_data: Promise<Location> = await response.json();
    this.#pokeCache.add(fullURL, location_data);
    return location_data;
  }

  async fetchPokemon(PokemonName: string): Promise<Pokemon> {
    const fullURL = `${PokeAPI.baseURL}/pokemon/${PokemonName}/`;
    const data: Promise<Pokemon> = this.#pokeCache.get(fullURL);
    if (data != undefined) {
      return data;
    }
    const response = await fetch(fullURL, {
      method: "GET",
      mode: "cors",
    });
    const PokemonData: Promise<Pokemon> = await response.json();
    this.#pokeCache.add(fullURL, PokemonData);
    return PokemonData;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
