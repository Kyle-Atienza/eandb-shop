import { Label } from "../../label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  innerClassName?: string;
}

export function Select({
  label,
  options,
  placeholder,
  className,
  innerClassName,
  ...rest
}: SelectProps) {
  return (
    <>
      {/* select component (no functionality) */}
      <div className={`flex flex-col gap-spaced-sm rounded-md ${className}`}>
        {label ? (
          <label htmlFor={rest.name}>
            <Label>{label}</Label>
          </label>
        ) : null}
        <div
          className={`flex spaced-sm bg-secondary rounded ${innerClassName}`}
        >
          <select className="w-full font-gopher  focus:outline-0" {...rest}>
            {options.map((option, index) => {
              return (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}
