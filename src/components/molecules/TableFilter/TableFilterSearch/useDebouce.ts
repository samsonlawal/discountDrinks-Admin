import { useEffect, useState } from "react";

const useDebounce = ({
  initialValue,
  onChange,
  debounce = 500,
}: {
  initialValue: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(initialValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [initialValue, debounce]);
  return value;
};

export { useDebounce };
