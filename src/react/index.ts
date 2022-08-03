import { useCallback, useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '..';

type Setter<Value> = (value: Value | ((value: Value) => Value)) => void;

export function useLocalStorage<Value>(
  name: string,
  fallback: Value,
): [Value, Setter<Value>] {
  const [state, setState] = useState(() => getLocalStorage(name, fallback));

  const fallbackRef = useRef(fallback);

  const set = useCallback<Setter<Value>>(
    value => {
      const currentValue = getLocalStorage(name, fallbackRef.current);

      const nextValue = value instanceof Function ? value(currentValue) : value;

      setLocalStorage(name, nextValue);
      setState(nextValue);
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
