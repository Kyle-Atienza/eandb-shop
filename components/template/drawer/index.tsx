import Cart from "@/components/cart";
import { useOptionsStore } from "@/state/options";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export function Drawer() {
  const pathname = usePathname();
  const router = useRouter();

  const { drawer } = useOptionsStore();

  return (
    <div
      className={`drawer fixed min-h-screen max-h-screen flex flex-col min-w-[630px] w-2/5 bg-light right-0 top-0 transition-all duration-500 spaced z-40 ${
        drawer ? "" : "translate-x-full"
      }`}
    >
      {pathname !== "/checkout" ? <Cart /> : null}
      {/* <Toaster /> */}
    </div>
  );
}
