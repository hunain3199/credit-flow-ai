"use client";

import { useState } from "react";

export const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500";

export const labelClass = "mb-1 block text-sm font-medium text-gray-700";

function EyeButton({
  visible,
  onToggle,
  labelReveal,
  labelConceal,
}: {
  visible: boolean;
  onToggle: () => void;
  labelReveal: string;
  labelConceal: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? labelConceal : labelReveal}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-800"
    >
      {visible ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </button>
  );
}

export function SensitiveField({
  id,
  label,
  value,
  onChange,
  revealAria,
  concealAria,
  autoComplete,
  /** When true (e.g. parent “Show hidden fields”), all values render as plain text until turned off. */
  revealValues,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  revealAria: string;
  concealAria: string;
  autoComplete?: string;
  revealValues?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const effectiveVisible = Boolean(revealValues) || visible;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={effectiveVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={`${inputClass} pr-10`}
        />
        {revealValues ? (
          <span
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-teal-600"
            aria-hidden
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
        ) : (
          <EyeButton
            visible={visible}
            onToggle={() => setVisible((v) => !v)}
            labelReveal={revealAria}
            labelConceal={concealAria}
          />
        )}
      </div>
    </div>
  );
}
