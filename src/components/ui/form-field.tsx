import React from "react";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}
