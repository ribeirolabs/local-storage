import { isArrayOrObject, isBoolean, isNumber } from './utils';

export function getLocalStorage<Value>(name: string, fallback: Value): Value {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const value = window.localStorage.getItem(name);

  if (value == null) {
    return fallback;
  }

  if (isArrayOrObject(value)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  }

  if (isBoolean(value)) {
    return (value === 'true') as any as Value;
  }

  if (isNumber(value)) {
    return parseFloat(value) as any as Value;
  }

  return (value ?? fallback) as any as Value;
}

export function setLocalStorage<Value>(name: string, value: Value): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    name,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
}

export function removeLocalStorage(name: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(name);
}
