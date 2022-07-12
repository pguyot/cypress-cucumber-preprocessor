export function createCacheWith<K extends object, V>(
  cache: {
    get(key: K): V | undefined;
    set(key: K, value: V | undefined): void;
  },
  mapper: (key: K) => V
) {
  return {
    cache,

    get(key: K): V {
      const cacheHit = this.cache.get(key);

      if (cacheHit) {
        return cacheHit;
      }

      const value = mapper(key);
      this.cache.set(key, value);
      return value;
    },
  };
}

export function createCache<K extends object, V>(mapper: (key: K) => V) {
  return createCacheWith(new Map<K, V>(), mapper);
}

export function createWeakCache<K extends object, V>(mapper: (key: K) => V) {
  return createCacheWith(new WeakMap<K, V>(), mapper);
}
