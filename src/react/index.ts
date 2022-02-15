import { useCallback, useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '..';

export function useLocalStorage<Value>(
  name: string,
  fallback: Value,
): [Value, (value: Value) => void] {
  const [state, setState] = useState(() => getLocalStorage(name, fallback));

  const fallbackRef = useRef(fallback);

  const set = useCallback(
    (value: Value) => {
      setLocalStorage(name, value);
      setState(value);
    },
    [name],
  );

  useEffect(() => {
    const value = getLocalStorage(name, fallbackRef.current);

    if (value === fallbackRef.current) {
      set(value);
    } else {
      setState(value);
    }
  }, [name, set]);

  return [state, set];
}

export function useSetLocalStorage<Value>(name: string, value: Value) {
  useEffect(() => {
    setLocalStorage(name, value);
  }, [name, value]);
}
