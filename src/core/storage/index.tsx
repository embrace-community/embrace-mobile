import { Env } from '../env';
import { defaultStorage } from './default';

// Only allow when in dev mode
if (Env.APP_ENV === 'development') {
  console.log('Cleared all storage');

  defaultStorage.clearAll();
}

export * from './default';
export * from './shared';
