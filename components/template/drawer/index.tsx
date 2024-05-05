import Cart from "@/components/cart";
import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { useOptionsStore } from "@/state/options";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Login } from "./login";
import { useUserStore } from "@/state/user";

export function Drawer() {
  const pathname = usePathname();
  const router = useRouter();

  const { drawer } = useOptionsStore();
  const { user } = useUserStore();

  return (
    <div
      className={`drawer fixed min-h-screen max-h-screen flex flex-col min-w-[550px] w-[30%] bg-light right-0 top-0 transition-all duration-500 z-40 ${
        drawer ? "" : "translate-x-full"
      }`}
    >
      {pathname !== "/checkout" ? (
        <div
          className={`flex-1 flex flex-col ${
            !user ? "pointer-events-none opacity-20" : ""
          }`}
        >
          <Cart />
        </div>
      ) : null}
      {!user ? (
        <div className="absolute top-0 left-0 flex flex-col justify-center spaced flex-1 w-full h-full">
          <div className=" spaced-x">
            <Login />
          </div>
        </div>
      ) : null}
    </div>
  );
}
