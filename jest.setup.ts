import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(window, 'localStorage', {
  value: (function (): Storage {
    const storage: Record<string, any> = {};

    return {
      length: 0,
      getItem(key) {
        return storage[key];
      },
      setItem(key, value) {
        storage[key] = value;
        this.length++;
      },
      removeItem(key) {
        delete storage[key];
        this.length--;
      },
      clear() {
        for (const key in storage) {
          delete storage[key];
        }

        this.length = 0;
      },
      key(index) {
        return Object.keys(storage)[index];
      },
    };
  })(),
});
