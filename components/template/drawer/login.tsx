import { Button } from "@/components/common/button";
import { Input } from "@/components/common/forms/input";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";

export function Login() {
  const { signIn } = useUserStore();
  const { getCart } = useOrdersStore();

  return (
    <form
      action={signIn}
      onSubmit={() => {
        getCart();
      }}
      className=""
    >
      <div className="flex flex-col gap-spaced-sm">
        <Input label="Email Address" type="email" name="email" id="email" />
        <Input label="Password" type="password" name="password" id="password" />
      </div>
      <div className="spaced-t">
        <Button className="" color="tertiary">
          Login
        </Button>
      </div>
    </form>
  );
}
