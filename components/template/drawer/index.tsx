import Cart from "@/components/cart";
import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { useOptionsStore } from "@/state/options";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Login } from "./login";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

function DrawerToggle({ className }: { className?: string }) {
  const pathname = usePathname();

  const { toggleDrawer, drawer } = useOptionsStore();
  const { cart } = useOrdersStore();
  const { user } = useUserStore();

  return (
    <div
      className={` spaced-md bg-light rounded-tl-full rounded-bl-full ${className} ${
        pathname.includes("/checkout") ? "hidden" : ""
      }`}
    >
      <button
        onClick={() => toggleDrawer()}
        className={` aspect-square flex w-12 text-light rounded-full items-center justify-center relative transition-colors text-xl ${
          drawer ? "bg-danger" : "bg-tertiary"
        }`}
      >
        {drawer ? (
          <i className="bi bi-x"></i>
        ) : (
          <>
            {cart.items.length ? (
              <div className="absolute top-0 right-0 w-4 text-xs rounded-full aspect-square bg-dark font-gopher">
                {cart.items.length}
              </div>
            ) : null}
            <i className={`bi bi-cart ${!user ? "opacity-40" : ""}`}></i>
          </>
        )}
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
    <div className="fixed top-0 left-0 w-screen h-screen">
      <DrawerToggle
        className={`absolute right-0 top-[10vh] md:hidden rounded-tl-full rounded-bl-full translate-x-full transition-transform ${
          drawer ? "" : "translate-x-0"
        }`}
      />

      <div
        className={`drawer fixed h-[80vh] md:h-screen flex flex-col items-start md:min-w-[550px] w-screen md:w-[30%] bg-light left-0 md:left-[unset] md:right-0 md:top-0 bottom-0 transition-all duration-500 z-40 spaced-y gap-spaced ${
          drawer ? "" : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        {" "}
        <DrawerToggle
          className={`spaced-x absolute top-0 md:top-[120px] left-[20px] md:left-0 md:-translate-y-0 md:-translate-x-full rounded-tl-full rounded-tr-full md:rounded-tr-none rounded-bl-none md:rounded-bl-full transition-transform ${
            drawer ? "-translate-y-full" : ""
          }`}
        />
        <div
          className={`flex flex-col items-start h-full *:w-full w-full gap-spaced ${
            !user ? "opacity-40 pointer-events-none" : null
          }`}
        >
          <Cart />
        </div>
        {!user ? (
          <div className="absolute top-0 left-0 flex flex-col justify-center flex-1 w-full h-full spaced">
            <Login />
          </div>
        ) : null}
      </div>
    </div>
  );
}
