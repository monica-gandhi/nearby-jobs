'use client';
import React, { useState } from 'react';
import { cn } from '@/common/utils/cn';

export default function MultiSelectInput({
  label = '',
  placeholder = 'Type something and press Enter',
  required = false,
  formSubmitted = false,
  value = [],
  onChange = () => {},
}) {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const hasError = required && (formSubmitted || touched) && value.length === 0;

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2 w-full">
      {/* Label */}
      {label && (
        <label
          className={cn(
            'text-sm font-medium leading-none',
            hasError ? 'text-destructive' : 'text-foreground'
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Input and Add button */}
      <div className="flex gap-2">
        <input
          type="text"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            hasError && 'border-destructive focus-visible:ring-destructive'
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTouched(true)}
        />
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-2 h-10 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 active:scale-95 transition-transform"
        >
          Add
        </button>
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-sm text-destructive">
          {label || 'This field'} is required
        </p>
      )}

      {/* Tag List */}
      <div className="flex flex-wrap gap-2 mt-3">
        {value.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-700 hover:text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
