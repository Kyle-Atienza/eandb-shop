import { Button } from "@/components/common/button";
import { Input } from "@/components/common/forms/input";
import { useUserStore } from "@/state/user";

export function Login() {
  const { signIn } = useUserStore();

  return (
    <form action={signIn} className="">
      <div className="flex flex-col gap-spaced-sm">
        <Input label="Email Address" type="email" name="email" id="email" />
        <Input label="Password" type="password" name="password" id="password" />
      </div>
      <Button className="mt-12" color="tertiary">
        Login
      </Button>
    </form>
  );
}
