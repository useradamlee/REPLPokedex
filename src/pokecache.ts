export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap(): void {
    const max_age = Date.now() - this.#interval;
    for (const [key, value] of this.#cache) {
      if (Date.now() - value.createdAt > this.#interval) {
        this.#cache.delete(key); // Remove the item
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, val: T): void {
    const entry: CacheEntry<any> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string) {
    if (this.#cache.has(key)) {
      return this.#cache.get(key)?.val;
    }
    return undefined;
  }
}
