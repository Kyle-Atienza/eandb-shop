export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="tracking-[0.4em] font-gopher text-[1vw] uppercase ">
      {children}
    </p>
  );
}
