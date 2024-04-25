import { Label } from "../label";

export function LabelButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button
      className="transition-colors rounded-full bg-light spaced-md text-dark hover:bg-primary"
      onClick={onClick}
    >
      <Label>{children}</Label>
    </button>
  );
}
