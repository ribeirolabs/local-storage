# @ribeirolabs/local-storage

Local storage helper for set/get values, with value conversion.

## Usage

### setLocalStorage `(name, value) => void`

Sets `name` with `value` in localStorage, it converts everything but strings with `JSON.stringify` so objects and arrays are stored correctly.

```js
import { setLocalStorage } from '@ribeirolabs/local-storage';

setLocalStorage('person', { name: 'Jhon' });
setLocalStorage('active', true);
setLocalStorage('ids', [1, 2]);
```

### getLocalStorage `(name, fallback) -> value`

Returns the value from localStorage or fallback if it's not present.

LocalStorage stores the values as a string, this function converts the value to the correct type.

```js
import { getLocalStorage } from '@ribeirolabs/local-storage';

getLocalStorage('person', { name: 'default' }) // { name: 'Jhon' }
getLocalStorage('active', false) // true
getLocalStorage('ids', []) // [1, 2]
getLocalStorage('missing', 'use-me') // "use-me"
```

### removeLocalStorage `(name) -> void`

No magic here, it removes `name` from localStorage.

## React

### useLocalStorage `(name, fallback) -> [value, setValue]`

Behaves like `useState`, but `setValue` updates the `value` in localStorage.

```jsx
import { useLocalStorage } from '@ribeirolabs/local-storage/react';

function Component() {
  // `value` will be synced in localStorage
  const [value, setValue] = useLocalStorage('name', 'Jhon Doe');

  return (
    <input name="name" value={value} onChange={e => setValue(e.target.value)} />
  );
}

```

### useSetLocalStorage `(name, value) -> void`

Use this when you need to sync the `value` into localStorage on every change.

```jsx
import { useState } from 'react';
import { useLocalStorage } from '@ribeirolabs/local-storage/react';

function Component() {
  const [value, setValue] = useState('Jhon Doe');

  // updates `name` on localStorage everytime the `value` changes
  useSetLocalStorage('name', value);

  return (
    <input name="name" value={value} onChange={e => setValue(e.target.value)} />
  );
}

```
