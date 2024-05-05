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
  const { resetOrdersStore } = useOrdersStore();

  return (
    <div className="relative wave bg-secondary h-[70px] spaced-x">
      {/* <div className="relative flex spaced-y gap-spaced-md h-[100px] items-center">
        <TransitionLink className="text-3xl text-tertiary" href="/">
          <i
            className={`bi bi-house transition-all duration-1000 ${
              pathname === "/" ? "text-primary" : "text-tertiary"
            }`}
          ></i>
        </TransitionLink>
        {user ? (
          <>
            {pathname !== "/checkout" ? (
              <button
                className={`text-3xl transition-colors ${
                  drawer ? "text-primary" : "text-tertiary"
                }`}
                onClick={() => toggleDrawer()}
              >
                <i className="bi bi-bag"></i>
              </button>
            ) : null}
            <button
              onClick={() => {
                signOut();
                resetOrdersStore();
                router.push("/");
              }}
              className="text-3xl text-tertiary"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </>
        ) : (
          <div>
            <Button size="sm" onClick={() => router.push("/#login")}>
              Log In
            </Button>
          </div>
        )}
      </div> */}
      <div className="flex items-center justify-between h-full gap-spaced translate-y-[3px] relative">
        <TransitionLink href="/">
          {/* <i className="bi bi-house" /> */}
          <Label>Home</Label>
        </TransitionLink>
        {user ? (
          <div className="flex gap-spaced">
            <button onClick={() => toggleDrawer()}>
              <Label>Cart(0)</Label>
            </button>
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
              router.push("/#login");
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
