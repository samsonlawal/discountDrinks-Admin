import React from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultiSelectTagsProps {
  label: string;
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function MultiSelectTags({
  label,
  availableTags,
  selectedTags,
  onTagsChange,
  className = "",
}: MultiSelectTagsProps) {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-2">
        {label}
      </label>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:bg-emerald-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag selector dropdown */}
      <Select onValueChange={handleTagToggle}>
        <SelectTrigger>
          <SelectValue placeholder="Select tag(s)" />
        </SelectTrigger>
        <SelectContent>
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <SelectItem
                key={tag}
                value={tag}
                disabled={selectedTags.includes(tag)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{tag}</span>
                  {selectedTags.includes(tag) && (
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
}
