import { buttonColorClassName } from "@/utils/classnames";
import { Label } from "../label";

export function Button({
  children,
  onClick,
  className,
  color,
  active = false,
  type = undefined,
  size,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  color?: "dark" | "base" | "light" | "primary";
  active?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "sm";
}) {
  const buttonSizeClassName = (size?: "sm") => {
    if (size) {
      return `spaced-${size}`;
    }

    return "spaced-md";
  };

  return (
    <button
      className={`transition-colors rounded-full ${buttonSizeClassName(
        size
      )} ${buttonColorClassName(color, active)} hover:bg-primary ${className}`}
      onClick={onClick}
      type={type}
    >
      <div className="spaced-x-xs">
        <Label>{children}</Label>
      </div>
    </button>
  );
}
