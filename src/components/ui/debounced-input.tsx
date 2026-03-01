import { useState, useEffect, useCallback, forwardRef } from "react";
import { Input } from "@/components/ui/input";

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  debounceMs?: number;
}

/**
 * An Input component that debounces value changes to prevent excessive re-renders.
 * The input updates locally immediately, but only calls onValueChange after the delay.
 */
export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ value, onValueChange, debounceMs = 300, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value);

    // Sync local value when external value changes (e.g., from database load)
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    // Debounced callback
    useEffect(() => {
      // Skip if values match (no change needed)
      if (localValue === value) return;

      const timer = setTimeout(() => {
        onValueChange(localValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [localValue, debounceMs, onValueChange, value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    }, []);

    return (
      <Input
        ref={ref}
        value={localValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

DebouncedInput.displayName = "DebouncedInput";
