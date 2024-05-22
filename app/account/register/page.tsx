"use client";

import { Input } from "@/components/common/forms/input";
import { Label } from "@/components/common/label";
import { useUserStore } from "@/state/user";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { signUp } = useUserStore();
  const [password, setPassword] = useState({
    default: "",
    confirm: "",
  });

  return (
    <form
      action={signUp}
      onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
        if (password.confirm !== password.default) {
          e.preventDefault();
          toast.error("Passwords did not match!");
        }
      }}
    >
      <div className="spaced border-t-2 border-light flex flex-col gap-spaced-sm">
        <Input
          label="Full Name"
          name="name"
          labelClassName="text-light"
          type="text"
          required
        />
        <Input
          label="Email Address"
          name="email"
          labelClassName="text-light"
          type="text"
          required
        />
        <div className="flex gap-spaced *:flex-1">
          <Input
            label="Password"
            name="password"
            labelClassName="text-light"
            type="password"
            required
            value={password.default}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword((prevState) => ({
                ...prevState,
                default: e.target.value,
              }))
            }
          />
          <Input
            label="Confirm Password"
            name="confirm-password"
            labelClassName="text-light"
            type="password"
            required
            value={password.confirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword((prevState) => ({
                ...prevState,
                confirm: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="spaced-x spaced-y-md hover:bg-primary border-t-2 border-light flex justify-center transition-colors w-full"
      >
        <Label className="text-light">Sign Up</Label>
      </button>
    </form>
  );
}
