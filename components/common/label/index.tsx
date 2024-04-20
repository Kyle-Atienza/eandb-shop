export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="tracking-[0.2em] font-gopher text-sm lg:text-[1vw] uppercase ">
      {children}
    </p>
  );
}
