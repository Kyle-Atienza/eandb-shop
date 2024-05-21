import {
  Button,
  SimpleButton,
  TransitionButton,
} from "@/components/common/button";
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
          className="relative -translate-x-0 -translate-y-0"
        >
          <div className="w-10 aspect-square">
            {/* <Image src={brand} alt="" /> */}
          </div>
        </TransitionLink>
        {user ? (
          <div className="flex ml-auto gap-spaced-sm">
            <div
              className={` flex gap-spaced bg-light w-9 md:w-10 aspect-square items-center justify-center rounded-full transition-colors ${
                pathname.includes("/profile") ? "bg-primary text-light" : ""
              }`}
            >
              <TransitionLink href="/profile">
                <div>
                  <i className="text-xl md:text-2xl bi bi-person"></i>
                </div>
              </TransitionLink>
            </div>
            <SimpleButton
              className="bg-light"
              onClick={() => {
                signOut();
                resetOrdersStore();
                router.push("/");
              }}
            >
              Log Out
            </SimpleButton>
          </div>
        ) : (
          <TransitionLink href="/account/login">
            <SimpleButton className="bg-light">Log In</SimpleButton>
          </TransitionLink>
        )}
      </div>
    </div>
  );
}
