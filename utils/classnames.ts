const buttonColorClassName = (
  color?: "dark" | "base" | "light" | "primary" | "tertiary" | "secondary",
  active?: boolean
) => {
  if (active) {
    return "bg-primary text-dark";
  }

  if (color) {
    return `bg-${color} text-light`;
  }

  return "bg-light text-dark";
};

const borderColorClassName = (
  color?: "dark" | "base" | "light" | "primary" | "tertiary"
) => {
  if (color) {
    return `border-${color}`;
  }

  return "border-light";
};

const textColorClassName = (
  color?: "dark" | "base" | "light" | "primary" | "tertiary"
) => {
  if (color) {
    return `text-${color}`;
  }

  return "text-light";
};

const inputSize = (size?: "sm") => {
  if (size === "sm") {
    return "w-14";
  }

  return "w-24";
};

export {
  buttonColorClassName,
  borderColorClassName,
  textColorClassName,
  inputSize,
};
