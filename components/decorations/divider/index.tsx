export function Divider({
  color,
}: {
  color?: "dark" | "base" | "light" | "primary";
}) {
  return (
    <div
      className={`w-full h-[2px] divider ${
        color ? `bg-${color} ` : `bg-light`
      }`}
    />
  );
}
