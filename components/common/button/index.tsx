import { buttonColorClassName } from "@/utils/classnames";
import { Label } from "../label";

export function Button({
  children,
  onClick,
  className,
  color,
  active = false,
  type = undefined,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  color?: "dark" | "base" | "light" | "primary";
  active?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}) {
  return (
    <button
      className={`transition-colors rounded-full spaced-md ${buttonColorClassName(
        color,
        active
      )} hover:bg-primary ${className}`}
      onClick={onClick}
      type={type}
    >
      <Label>{children}</Label>
    </button>
  );
}
