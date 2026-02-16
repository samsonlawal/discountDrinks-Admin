import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  name?: string;
  options: string[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (name: string, value: string) => void;
  className?: string;
}

export const FormSelect = React.memo(
  ({
    label,
    name,
    options,
    placeholder,
    value,
    onValueChange,
    onChange,
    className = "",
  }: FormSelectProps) => {
    const validValue = React.useMemo(() => {
      if (!value) return undefined;
      return (
        options.find(
          (opt) => opt === value || opt.toLowerCase() === value.toLowerCase(),
        ) || value
      );
    }, [value, options]);

    return (
      <div className={className}>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          {label}
        </label>
        <Select
          value={validValue}
          onValueChange={(val) => {
            onValueChange?.(val);
            if (name && onChange) {
              onChange(name, val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={placeholder || `Select ${label.toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
);
