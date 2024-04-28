import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { Divider } from "@/components/decorations/divider";
import { useUserStore } from "@/state/user";

export function BentoLogin() {
  const { signIn } = useUserStore();

  return (
    <>
      <p className="font-ranille text-[2vw] lg:text-[4.5vw] text-light">
        Login to your Account
      </p>
      <div className="spaced-b-md">
        <Divider />
      </div>
      <form className="" action={signIn}>
        <div className="flex flex-col gap-spaced-md">
          <div className="flex flex-col gap-spaced-md">
            <div className="flex gap-spaced-md">
              <div className="flex flex-col gap-spaced-sm flex-1">
                <label htmlFor="email">
                  <Label>
                    <span className="text-light">Email</span>
                  </Label>
                </label>
                <div className="flex rounded-md spaced-sm bg-light ">
                  <input
                    name="email"
                    type="email"
                    className="w-full font-gopher focus:outline-0 bg-[transparent] spaced-xs text-xl"
                    placeholder="youremail@email.com"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-spaced-sm flex-1">
                <label htmlFor="email">
                  <Label>
                    <span className="text-light">Password</span>
                  </Label>
                </label>
                <div className="flex rounded-md spaced-sm bg-light row-start-2 ">
                  <input
                    name="password"
                    type="password"
                    className="w-full font-gopher focus:outline-0 bg-[transparent] spaced-xs text-xl"
                  ></input>
                </div>
              </div>
            </div>
            <Button type="submit" className="self-start" color="dark">
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
