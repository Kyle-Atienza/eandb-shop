import { useAnimationStore } from "@/state/animation";
import { usePathname, useRouter } from "next/navigation";

export function TransitionLink({
  children,
  className,
  href,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { animatePageOut } = useAnimationStore();

  const handleClick = () => {
    if (pathname !== href && href) {
      animatePageOut(href, router);
    }
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}
