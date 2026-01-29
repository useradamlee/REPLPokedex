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
    const fullURL = `${PokeAPI.baseURL}/location/${locationName}/`;
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
  id: number;
  name: string;
  region: {
    name: string;
    url: string;
  };
};
