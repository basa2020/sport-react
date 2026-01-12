import { useState, useEffect } from "react";
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedTerm, setDebouncedTerm] = useState<T>(value);
  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedTerm(value);
    }, delay);

    return () => clearInterval(interval);
  }, [value]);
  return debouncedTerm;
};
export default useDebounce;
