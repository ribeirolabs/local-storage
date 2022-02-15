export function isArrayOrObject(value?: string) {
  if (value == null) {
    return false;
  }

  return /^\{/.test(value) || /^\[/.test(value);
}

export function isBoolean(value?: string) {
  if (value == null) {
    return false;
  }

  return /^(true|false)$/.test(value);
}

export function isNumber(value?: string) {
  if (value == null) {
    return false;
  }

  // decimal number
  if (/\./.test(value)) {
    return /^\d+\.\d+$/.test(value);
  }

  return /^\d+$/.test(value);
}
