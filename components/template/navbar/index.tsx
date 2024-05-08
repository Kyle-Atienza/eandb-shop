import { Button, TransitionButton } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { TransitionLink } from "@/components/common/transition-link";
import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";
import { useOptionsStore } from "@/state/options";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, signOut } = useUserStore();
  const { toggleDrawer, drawer } = useOptionsStore();
  const { resetOrdersStore, cart } = useOrdersStore();

  return (
    <div className="relative wave bg-secondary h-[70px] spaced-x">
      <div className="flex items-center justify-between h-full gap-spaced translate-y-[3px] relative">
        <TransitionLink href="/">
          {/* <i className="bi bi-house" /> */}
          <Label>Home</Label>
        </TransitionLink>
        {user ? (
          <div className="flex gap-spaced">
            {/* <button onClick={() => toggleDrawer()}>
              <Label>Cart({cart.items.length})</Label>
            </button> */}
            <button
              onClick={() => {
                signOut();
                resetOrdersStore();
                router.push("/");
              }}
            >
              <Label>Logout</Label>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Label>Login</Label>
          </button>
        )}
      </div>
    </div>
  );
}

{
  /* <FakeBorderRadius position="topLeft" className="top-full" />
<FakeBorderRadius position="topRight" className="right-0 top-full" /> */
}
