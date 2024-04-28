import { buttonColorClassName } from "@/utils/classnames";
import { Label } from "../label";

export function Button({
  children,
  onClick,
  className,
  color,
  active = false,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  color?: "dark" | "base" | "light" | "primary";
  active?: boolean;
}) {
  return (
    <button
      className={`transition-colors rounded-full spaced-md ${buttonColorClassName(
        color,
        active
      )} hover:bg-primary ${className}`}
      onClick={onClick}
    >
      <Label>{children}</Label>
    </button>
  );
}
