import { useCallback, useRef } from "react";

type DebounceCallback<T extends any[]> = (...args: T) => void;

export const useDebounce = <T extends any[]>(
  callback: DebounceCallback<T>,
  delay: number
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounceCallback = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay, callback]
  );

  return { debounceCallback };
};
