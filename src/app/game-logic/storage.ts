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
  const [storedValue, setStoredValue] = useState(() => {
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
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
