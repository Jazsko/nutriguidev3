import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  error,
  required = false,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 