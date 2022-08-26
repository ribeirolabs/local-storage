import { useCallback, useEffect, useRef, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '..';

type Setter<Value> = (value: Value | ((value: Value) => Value)) => void;

const PRIMITIVE = /number|string|boolean/;

export function useLocalStorage<Value>(
  name: string,
  fallback: Value,
): [Value, Setter<Value>] {
  const [state, setState] = useState(fallback);

  useEffect(() => {
    const value = getLocalStorage(name, null);

    if (value) {
      setState(value as Value);
    }
  }, []);

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

    if (value === fallbackRef.current && !PRIMITIVE.test(typeof value)) {
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
