import React from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultiSelectProps {
  label: string;
  placeholder?: string;
  availableOptions: string[];
  selectedOptions: string[];
  onOptionsChange: (options: string[]) => void;
  className?: string;
}

export const MultiSelect = React.memo(
  ({
    label,
    placeholder = "Select option(s)",
    availableOptions,
    selectedOptions,
    onOptionsChange,
    className = "",
  }: MultiSelectProps) => {
    const handleOptionToggle = (option: string) => {
      if (selectedOptions.includes(option)) {
        onOptionsChange(selectedOptions.filter((o) => o !== option));
      } else {
        onOptionsChange([...selectedOptions, option]);
      }
    };

    const handleRemoveOption = (option: string) => {
      onOptionsChange(selectedOptions.filter((o) => o !== option));
    };

    return (
      <div className={className}>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          {label}
        </label>

        {/* Selected options display */}
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedOptions.map((option) => (
              <span
                key={option}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium"
              >
                {option}
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option)}
                  className="hover:bg-emerald-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Option selector dropdown */}
        <Select onValueChange={handleOptionToggle}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  disabled={selectedOptions.includes(option)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {selectedOptions.includes(option) && (
                      <span className="ml-2 text-emerald-600">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    );
  },
);
