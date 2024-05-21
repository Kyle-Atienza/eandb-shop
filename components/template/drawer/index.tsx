import Cart from "@/components/cart";
import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { useOptionsStore } from "@/state/options";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Login } from "./login";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";
import { CartDrawerToggle } from "@/components/cart/toggle";

function DrawerToggle({ className }: { className?: string }) {
  const pathname = usePathname();

  const { toggleDrawer, drawer } = useOptionsStore();
  const { cart } = useOrdersStore();
  const { user } = useUserStore();

  return (
    <div
      className={`spaced-md bg-light rounded-tl-full rounded-bl-full ${className} ${
        pathname.includes("/checkout") ? "hidden" : ""
      }`}
    >
      <button
        onClick={() => toggleDrawer()}
        className={`aspect-square flex w-9 md:w-12 text-light rounded-full items-center justify-center relative transition-colors text-sm md:text-xl ${
          drawer ? "bg-danger" : "bg-tertiary"
        }`}
      >
        {drawer ? <i className="bi bi-x"></i> : <CartDrawerToggle />}
      </button>
    </div>
  );
}

export function Drawer() {
  const pathname = usePathname();
  const router = useRouter();

  const { cart } = useOrdersStore();
  const { drawer, toggleDrawer } = useOptionsStore();
  const { user } = useUserStore();

  return (
    <>
      <div className="absolute right-0 top-[10vh] md:hidden overflow-hidden">
        <DrawerToggle
          className={` rounded-tl-full rounded-bl-full transition-transform ${
            drawer || !user ? "translate-x-full" : ""
          }`}
        />
      </div>

      <div
        className={`drawer fixed h-[80vh] md:h-screen flex flex-col items-start md:min-w-[500px] w-screen md:w-[30%] bg-light left-0 md:left-[unset] md:right-0 md:top-0 bottom-0 transition-all duration-500 z-40 gap-spaced border-2 border-light ${
          drawer ? "" : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <DrawerToggle
          className={`spaced-x absolute top-0 md:top-[120px] left-[20px] md:left-0 md:-translate-y-0 md:-translate-x-full rounded-tl-full rounded-tr-full md:rounded-tr-none rounded-bl-none md:rounded-bl-full transition-transform 
          ${drawer ? "-translate-y-full" : ""}
        `}
        />
        {!user ? (
          <div className=" flex flex-col flex-1 w-full h-full md:justify-center spaced z-10">
            <Login />
          </div>
        ) : null}
        <Cart />
      </div>
    </>
  );
}
