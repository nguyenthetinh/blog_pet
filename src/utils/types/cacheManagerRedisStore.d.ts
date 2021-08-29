declare module 'cache-manager-redis-stor' {
  import { CacheStoreFactory } from '@nestjs/common/cache/interfaces/cache-manager.interface';
  const cacheStore: CacheStoreFactory;

  export = cacheStore
}