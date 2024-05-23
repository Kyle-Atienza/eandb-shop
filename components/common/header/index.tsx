interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

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

export function HeaderTwo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-4xl lg:text-5xl whitespace-pre-line text-light font-ranille ${className}`}
    >
      {children}
    </h2>
  );
}
