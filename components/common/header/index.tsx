export function HeaderOne({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-5xl lg:text-6xl whitespace-pre-line text-light font-ranille ${className}`}
    >
      {children}
    </h1>
  );
}
