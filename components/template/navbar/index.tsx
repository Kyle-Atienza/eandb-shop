import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";
import { useOptionsStore } from "@/state/options";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, signOut } = useUserStore();
  const { toggleDrawer } = useOptionsStore();
  const { resetOrdersStore } = useOrdersStore();

  return (
    <div className="sticky top-0 z-50 spaced-x bg-base">
      <div className="relative flex spaced-y gap-spaced-md">
        <button
          className="text-3xl text-light"
          onClick={() => router.push("/")}
        >
          <i className="bi bi-house"></i>
        </button>
        {user ? (
          <>
            {pathname !== "/checkout" ? (
              <button
                className="text-3xl text-light"
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
              className="text-3xl text-light"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </>
        ) : (
          <div>
            <button
              onClick={() => router.push("/login")}
              className="self-start p-2 bg-dark text-light"
            >
              Login
            </button>
          </div>
        )}
        <FakeBorderRadius position="topLeft" className="top-full" />
        <FakeBorderRadius position="topRight" className="right-0 top-full" />
      </div>
    </div>
  );
}
