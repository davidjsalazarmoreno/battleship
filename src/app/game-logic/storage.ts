import { useState } from 'react';
import { Score } from './types';

export type StorageKeys = '@battleship/scoreboard';

/**
 *
 * Source https://usehooks.com/useLocalStorage/
 * @export
 */
export function useLocalStorage(initialValue: Score[] = []) {
  const key: StorageKeys = '@battleship/scoreboard';
  const [storedValue, setStoredValue] = useState<Score[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    storedValue,
    setValue,
  };
}
