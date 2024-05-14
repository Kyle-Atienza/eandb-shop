import { Label } from "../../label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
}

export function Input({
  label,
  className,
  labelClassName,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col gap-spaced-xs ${labelClassName}`}>
      {label ? (
        <label htmlFor={rest.name}>
          <Label>{label}</Label>
        </label>
      ) : null}
      <input
        {...rest}
        className={`rounded-sm spaced-y-sm spaced-x-md font-gopher ${className}`}
      />
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, ...rest }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-spaced-sm">
      {label ? (
        <label htmlFor={rest.name}>
          <Label>{label}</Label>
        </label>
      ) : null}
      <textarea
        {...rest}
        className={`rounded-md spaced-y-sm spaced-x-md font-gopher`}
      />
    </div>
  );
}

/* export function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-spaced-sm">
      {label ? (
        <label htmlFor={rest.name}>
          <Label>{label}</Label>
        </label>
      ) : null}
      <input
        {...rest}
        className={`rounded-md spaced-y-sm spaced-x-md font-gopher`}
      />
    </div>
  );
} */
