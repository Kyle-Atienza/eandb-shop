import { Label } from "../../label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-spaced-sm">
      {label ? (
        <label htmlFor={rest.name}>
          <Label>{label}</Label>
        </label>
      ) : null}
      <input
        {...rest}
        className={`rounded spaced-y-sm spaced-x-md font-gopher`}
      />
    </div>
  );
}
