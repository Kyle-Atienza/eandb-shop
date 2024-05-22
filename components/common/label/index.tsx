export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-merchant text-md lg:text-xl tracking-widest uppercase inline ${className}`}
    >
      {children}
    </p>
  );
}
