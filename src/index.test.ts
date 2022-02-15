import { getLocalStorage, removeLocalStorage, setLocalStorage } from '.';

it('sets value', () => {
  setLocalStorage('number', 1);
  setLocalStorage('boolean', true);
  setLocalStorage('string', 'test');
  setLocalStorage('object', { name: 'test' });
  setLocalStorage('array', [1, 2]);

  expect(window.localStorage.length).toEqual(5);
  expect(window.localStorage.getItem('number')).toEqual('1');
  expect(window.localStorage.getItem('boolean')).toEqual('true');
  expect(window.localStorage.getItem('string')).toEqual('test');
  expect(window.localStorage.getItem('object')).toEqual(
    JSON.stringify({ name: 'test' }),
  );
  expect(window.localStorage.getItem('array')).toEqual(JSON.stringify([1, 2]));
});

it('returns value with the righ type', () => {
  expect(getLocalStorage('number', 0)).toEqual(1);
  expect(getLocalStorage('boolean', false)).toEqual(true);
  expect(getLocalStorage('string', '')).toEqual('test');
  expect(getLocalStorage('object', {})).toEqual({ name: 'test' });
  expect(getLocalStorage('array', [])).toEqual([1, 2]);
});

it('returns fallback when value is missing', () => {
  expect(getLocalStorage('missing', [])).toEqual([]);
});

it('removes value', () => {
  removeLocalStorage('number');

  expect(window.localStorage.length).toEqual(4);
  expect(getLocalStorage('number', null)).toBeNull();
});
