"use client";

import { Calendar } from "lucide-react";
import React, { useRef, useState } from "react";

// DateInputLabel.tsx
// Uncontrolled TypeScript version of the styled date input
// The actual <input type="date"> is hidden, and a styled label acts as the trigger.

interface DateInputLabelProps {
  id?: string;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const DateInputLabel: React.FC<DateInputLabelProps> = ({
  id = "date-input",
  label = "Choose date",
  placeholder = "Select a date",
  min,
  max,
  defaultValue = "",
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const formatted = (val: string): string => {
    if (!val) return "";
    try {
      const d = new Date(val + "T00:00:00");
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return val;
    }
  };

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  };

  return (
    <div className="col-span-2 active:scale-95 bg-blue-200 rounded-2xl">
      {/* Visually hidden native date input */}
      <input
        id={id}
        ref={inputRef}
        type="date"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className="sr-only"
        aria-hidden="false"
      />

      {/* Styled label acts as the trigger */}
      <label
        htmlFor={id}
        onClick={(e) => {
          e.preventDefault();
          openPicker();
        }}
        className="h-full group flex items-center justify-between w-full p-3 md:p-4"
        role="button"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
      >
        <div className="flex items-center justify-center w-full">
          <Calendar className="mx-auto size-4 sm:size-5 md:size-6" />{" "}
        </div>
      </label>
    </div>
  );
};

export default DateInputLabel;
