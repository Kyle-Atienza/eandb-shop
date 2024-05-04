export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`tracking-[0.2em] font-gopher text-sm lg:text-xl uppercase inline`}
    >
      {children}
    </p>
  );
}
