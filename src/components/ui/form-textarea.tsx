import React from "react";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}

export function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 6,
  className = "",
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}
