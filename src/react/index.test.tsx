import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import { useLocalStorage, useSetLocalStorage } from '.';

beforeEach(() => {
  window.localStorage.clear();
});

describe('useLocalStorage', () => {
  it('gets and sets values', () => {
    function Component() {
      const [value, setValue] = useLocalStorage('name', 'Jhon');

      return (
        <div>
          <span>name: {value}</span>
          <button onClick={() => setValue('Doe')}>change</button>
        </div>
      );
    }

    const { unmount } = render(<Component />);

    // Initial render with fallback value
    expect(screen.queryByText('name: Jhon')).toBeInTheDocument();
    expect(window.localStorage.getItem('name')).toEqual('Jhon');

    screen.getByRole('button').click();

    expect(screen.queryByText('name: Doe')).toBeInTheDocument();
    expect(window.localStorage.getItem('name')).toEqual('Doe');

    unmount();
    render(<Component />);

    // Inital render with localStorage value
    expect(screen.queryByText('name: Doe')).toBeInTheDocument();
  });

  it('accepts function as setter', () => {
    function Component() {
      const [value, setValue] = useLocalStorage('name', 'Jhon');

      return (
        <div>
          <span>name: {value}</span>
          <button onClick={() => setValue(current => current + ' Doe')}>
            change
          </button>
        </div>
      );
    }

    const { unmount } = render(<Component />);

    // Initial render with fallback value
    expect(screen.queryByText('name: Jhon')).toBeInTheDocument();
    expect(window.localStorage.getItem('name')).toEqual('Jhon');

    screen.getByRole('button').click();

    expect(screen.queryByText('name: Jhon Doe')).toBeInTheDocument();
    expect(window.localStorage.getItem('name')).toEqual('Jhon Doe');

    unmount();
    render(<Component />);

    // Inital render with localStorage value
    expect(screen.queryByText('name: Jhon Doe')).toBeInTheDocument();
  });
});

describe('useSetLocalStorage', () => {
  it('syncs localStorage', () => {
    function Component() {
      const [value, setValue] = useState(0);

      useSetLocalStorage('count', value);

      return (
        <div>
          <button onClick={() => setValue(count => count + 1)}>
            increment
          </button>
        </div>
      );
    }

    render(<Component />);

    expect(window.localStorage.getItem('count')).toEqual('0');

    act(() => {
      screen.getByRole('button').click();
    });

    expect(window.localStorage.getItem('count')).toEqual('1');
  });
});
