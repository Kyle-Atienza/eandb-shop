"use client";

import { buttonColorClassName } from "@/utils/classnames";
import { Label } from "../label";
import { TransitionLink } from "../transition-link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  color?: "dark" | "base" | "light" | "primary" | "tertiary" | "secondary";
  active?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "sm";
}

export function Button({
  children,
  onClick,
  className,
  color,
  active = false,
  type = undefined,
  size,
}: ButtonProps) {
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
      <div className="flex spaced-x-xs">
        <Label>{children}</Label>
      </div>
    </button>
  );
}

interface TransitionButtonProps extends ButtonProps {
  href: string;
}

export function TransitionButton({
  href,
  children,
  onClick,
  className,
  color,
  active = false,
  type = undefined,
  size,
}: TransitionButtonProps) {
  const buttonProps = {
    children,
    onClick,
    className,
    color,
    active,
    type,
    size,
  };

  return (
    <TransitionLink href={href}>
      <Button {...buttonProps}>{buttonProps.children}</Button>
    </TransitionLink>
  );
}

interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function SimpleButton({
  children,
  className,
  ...rest
}: SimpleButtonProps) {
  return (
    <button
      className={`text-sm rounded-sm font-gopher spaced-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
