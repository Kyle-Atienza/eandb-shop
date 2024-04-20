import { Label } from "../label";

export function LabelButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="transition-colors rounded-full bg-light spaced-small text-dark hover:bg-primary">
      <Label>{children}</Label>
    </button>
  );
}
