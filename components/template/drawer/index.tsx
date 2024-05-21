import Cart, { CartCheckout } from "@/components/cart";
import { useOptionsStore } from "@/state/options";
import { CartDrawerToggle } from "@/components/cart/toggle";

export function Drawer() {
  const { drawer, toggleDrawer } = useOptionsStore();

  return (
    <>
      <div className="fixed bottom-0 right-0 spaced-r spaced-b">
        <button
          onClick={() => toggleDrawer()}
          className={`aspect-square flex w-14 text-light rounded-full items-center justify-center relative transition-colors text-sm border-2 border-light ${
            drawer ? "bg-danger" : "bg-tertiary"
          }`}
        >
          <CartDrawerToggle />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-secondary -z-10 translate-y-full transition-transform duration-500 border-2  border-light flex flex-col pt-[80px] ${
          drawer ? "!translate-y-0" : ""
        } `}
      >
        <Cart />
        <div className="flex-1"></div>
        <div className="flex border-light">
          <div className="flex-1 flex *:w-full">
            <CartCheckout />
          </div>
          <div className="spaced bg-light w-fit">
            <div className="w-14 aspect-square"></div>
          </div>
        </div>
      </div>
    </>
  );
}
