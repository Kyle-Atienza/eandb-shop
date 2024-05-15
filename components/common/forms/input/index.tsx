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

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
}

export function Switch({
  label,
  className,
  labelClassName,
  ...rest
}: SwitchProps) {
  return (
    <div className="flex items-center">
      <label className="inline-flex items-center cursor-pointer gap-spaced-md">
        <input type="checkbox" value="" className="sr-only peer" {...rest} />
        <div
          className={`relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
         peer-checked:bg-primary peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${className}`}
        ></div>
        <span className={labelClassName}>
          <Label>{label}</Label>
        </span>
      </label>
    </div>
  );
}
