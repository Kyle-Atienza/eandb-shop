import { Button } from "@/components/common/button";
import { Divider } from "@/components/decorations/divider";
import { useOptionsStore } from "@/state/options";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";

export function BentoUserInfo() {
  const { user } = useUserStore();
  const { cart } = useOrdersStore();
  const { toggleDrawer } = useOptionsStore();

  return (
    <>
      <p className="font-ranille text-[2vw] lg:text-[4.5vw] text-light">
        Hi {user?.name}!
      </p>
      <div className="spaced-b-md">
        <Divider />
      </div>
      <div className="flex flex-col gap-space-md items-start">
        <p className="font-gopher text-light">
          {cart.items.length
            ? `You currently have ${cart.items.length} items in your cart! 🛒`
            : "Your cart is currently empty 📭"}
        </p>
        <Button onClick={() => toggleDrawer(true)}>View Cart</Button>
      </div>
    </>
  );
}
