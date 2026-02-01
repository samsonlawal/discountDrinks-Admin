// This component is under review and subjected to change

import { useEffect, useState } from "react";
import { useDebounce } from "./useDebouce";

const DebounceInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);
  useDebounce({ initialValue: value, onChange });
  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export { DebounceInput };
