"use client";

import { SimpleButton } from "@/components/common/button";
import { Input } from "@/components/common/forms/input";
import { useUserStore } from "@/state/user";

export default function Page() {
  const { user, updateMe } = useUserStore();

  return (
    <div>
      <form action={updateMe}>
        <div className="flex *:flex-1 gap-space-md">
          <Input
            label="Full Name"
            name="name"
            className="bg-light text-dark"
            labelClassName="text-light"
            defaultValue={user?.name}
          />
          <Input
            label="Email"
            name="email"
            className="bg-light text-dark"
            labelClassName="text-light"
            defaultValue={user?.email}
          />
        </div>
        <div className="spaced-t">
          <SimpleButton type="submit" className=" bg-light">
            Save
          </SimpleButton>
        </div>
      </form>
    </div>
  );
}
