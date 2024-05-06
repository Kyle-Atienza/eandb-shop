export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`tracking-[0.2em] font-gopher text-xs lg:text-sm uppercase inline`}
    >
      {children}
    </p>
  );
}
