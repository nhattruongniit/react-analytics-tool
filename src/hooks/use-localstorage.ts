import React from "react";
export const useLocalStorage = <T>(key: string, initialValue?: T): [T, (value: T) => void] => {
  const _initialValue = initialValue as any;
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue

      const value = item ? JSON.parse(item) : _initialValue;

      return value;
    } catch (error) {
      // If error also return initialValue
      window.localStorage.setItem(key, _initialValue);
      return _initialValue || "";
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  React.useEffect(() => {
    const item = window.localStorage.getItem(key);

    const value = item ? JSON.parse(item) : initialValue;
    value && setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return [storedValue, setValue];
};
