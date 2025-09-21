import React from 'react';
import { COLORS } from '../constants.ts';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  rows?: number; // For textarea
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  isRequired = false,
  rows,
}) => {
  const commonInputStyles = `w-full px-4 py-3 bg-transparent border rounded-md text-[${COLORS.textPrimary}] placeholder-[${COLORS.textSecondary}] transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}]`;
  const borderStyle = error ? `border-[${COLORS.error}]` : `border-[${COLORS.border}] focus:border-[${COLORS.accent}]`;

  if (type === 'checkbox') {
    return (
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={onChange}
            className={`h-5 w-5 rounded border-[${COLORS.border}] text-[${COLORS.accent}] focus:ring-[${COLORS.accent}] bg-transparent mr-3`}
          />
          <span className={`text-sm text-[${COLORS.textSecondary}]`}>
            {label}
            {isRequired && <span className={`text-[${COLORS.accent}]`}>*</span>}
          </span>
        </label>
        {error && <p className={`mt-1 text-xs text-[${COLORS.error}]`}>{error}</p>}
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <label htmlFor={name} className={`block text-sm font-medium text-[${COLORS.textSecondary}] mb-1`}>
        {label}
        {isRequired && <span className={`text-[${COLORS.accent}]`}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          className={`${commonInputStyles} ${borderStyle}`}
          required={isRequired}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className={`${commonInputStyles} ${borderStyle}`}
          required={isRequired}
        />
      )}
      {error && <p className={`mt-1 text-xs text-[${COLORS.error}]`}>{error}</p>}
    </div>
  );
};

export default FormField;