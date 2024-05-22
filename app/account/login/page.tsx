"use client";

import { Input } from "@/components/common/forms/input";
import { HeaderOne } from "@/components/common/header";
import { Label } from "@/components/common/label";
import { useUserStore } from "@/state/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { signIn, user } = useUserStore();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <form action={signIn}>
      <div className="spaced border-t-2 border-light flex flex-col gap-spaced-sm">
        <Input
          label="Email Address"
          name="email"
          labelClassName="text-light"
          type="text"
          required
        />
        <Input
          label="Password"
          name="password"
          labelClassName="text-light"
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        className="spaced-x spaced-y-md hover:bg-primary border-t-2 border-light flex justify-center transition-colors w-full"
      >
        <Label className="text-light">Log In</Label>
      </button>
    </form>
  );
}
