import { animatePageOut } from "@/utils/animations";
import { usePathname, useRouter } from "next/navigation";

export function TransitionLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    /* if (href) {
      if (pathname !== href) {
        console.log("out");
        animatePageOut(href, router);
      }
    } */
  };

  return <div onClick={handleClick}>{children}</div>;
}
