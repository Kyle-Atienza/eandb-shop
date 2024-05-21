import { Input } from "@/components/common/forms/input";
import { HeaderOne } from "@/components/common/header";
import { Label } from "@/components/common/label";

export default function Page() {
  return (
    <>
      <div className="spaced border-t-2 border-light">
        <form action="" className="flex flex-col gap-spaced-sm">
          <Input label="Full Name" labelClassName="text-light" />
          <Input label="Email Address" labelClassName="text-light" />
          <Input label="Password" labelClassName="text-light" />
        </form>
      </div>
      <div className="spaced-x spaced-y-md hover:bg-primary border-t-2 border-light flex justify-center transition-colors">
        <Label className="text-light">Sign Up</Label>
      </div>
    </>
  );
}
