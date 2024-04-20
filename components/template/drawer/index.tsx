import Cart from "@/components/cart";
import { useOptionsStore } from "@/state/options";
import { usePathname, useRouter } from "next/navigation";

export function Drawer() {
  const pathname = usePathname();
  const router = useRouter();

  const { drawer } = useOptionsStore();

  return (
    <div
      className={`drawer fixed min-h-screen max-h-screen flex flex-col w-[500px] bg-light right-0 transition-all spaced ${
        drawer ? "" : "translate-x-full"
      }`}
    >
      {pathname !== "/checkout" ? (
        <div>
          <div className="flex justify-between">
            <div>Your Cart</div>
            <button
              onClick={() => router.push("/checkout")}
              className="self-start p-2 bg-dark text-light"
            >
              Checkout
            </button>
          </div>
          <Cart />
        </div>
      ) : null}
    </div>
  );
}
