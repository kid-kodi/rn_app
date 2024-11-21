// const [isVisible, toggleVisibility] = useToggle();
// <Button onPress={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</Button>


import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle];
};

export default useToggle;
