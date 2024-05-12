import { Button, TransitionButton } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { TransitionLink } from "@/components/common/transition-link";
import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";
import { useOptionsStore } from "@/state/options";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import brand from "@/public/brand.svg";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, signOut } = useUserStore();
  const { toggleDrawer, drawer } = useOptionsStore();
  const { resetOrdersStore, cart } = useOrdersStore();

  return (
    <div className="relative wave bg-secondary h-[70px] spaced-x">
      <div className="flex items-center justify-between h-full gap-spaced translate-y-[3px] relative">
        <TransitionLink
          href="/"
          className="absolute md:relative -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 md:-translate-y-0 top-1/2 md:top-[unset] left-1/2 md:left-[unset]"
        >
          <div className="w-10 aspect-square">
            <Image src={brand} alt="" />
          </div>
        </TransitionLink>
        {user ? (
          <div className="flex ml-auto gap-spaced">
            {" "}
            <button
              onClick={() => {
                signOut();
                resetOrdersStore();
                router.push("/");
              }}
            >
              <Label className="">Logout</Label>
              {/* <i className="text-2xl md:hidden bi bi-box-arrow-right"></i> */}
            </button>
          </div>
        ) : (
          <button
            className="ml-auto"
            onClick={() => {
              toggleDrawer();
            }}
          >
            <Label className="">Login</Label>
            {/* <i className="text-2xl bi bi-box-arrow-in-right"></i> */}
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
