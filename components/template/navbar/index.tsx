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
        {/* middle */}
        <TransitionLink
          href="/"
          className="flex flex-col text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 nav-brand hover:text-primary transition-colors cursor-pointer"
        >
          <div className="text-3xl font-gopher ">E&B</div>
          <div className="font-gopher uppercase text-xs leading-[0.8em]">
            Farm
          </div>
        </TransitionLink>
        {/* left */}
        <div className="ml-auto">
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
    </div>
  );
}
