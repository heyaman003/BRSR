import { useCallback, useRef } from "react";

const useDebounce = (func: Function, delay: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounceFunction = useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );

  return debounceFunction;
};

export default useDebounce;
