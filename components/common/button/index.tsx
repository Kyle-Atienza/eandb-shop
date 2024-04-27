import { Label } from "../label";

export function Button({
  children,
  onClick,
  className,
  color,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  color?: "dark" | "base" | "light" | "primary";
}) {
  const buttonColorClassName = (
    color?: "dark" | "base" | "light" | "primary"
  ) => {
    if (color) {
      return `bg-${color} text-light`;
    }

    return "bg-light text-dark";
  };

  /* if (color === "dark") {
    return (
      <button
        className={`transition-colors rounded-full bg-dark spaced-md text-light hover:bg-primary ${className}`}
        onClick={onClick}
      >
        <Label>{children}</Label>
      </button>
    );
  } */

  return (
    <button
      className={`transition-colors rounded-full spaced-md ${buttonColorClassName(
        color
      )} hover:bg-primary ${className}`}
      onClick={onClick}
    >
      <Label>{children}</Label>
    </button>
  );
}
