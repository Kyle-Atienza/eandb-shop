"use client";

import { Label } from "@/components/common/label";
import { Orders } from "@/components/pages/profile/orders";
import { useUserStore } from "@/state/user";

function Card({
  title,
  children,
  disabled,
  editable,
  className,
}: {
  title: string;
  disabled?: boolean;
  editable?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-light spaced-md rounded-md flex flex-col gap-spaced-sm ${className}`}
    >
      <div className="flex justify-between items-center">
        <Label className="whitespace-pre-line">
          <span className="leading-[1.2em]">{title}</span>
        </Label>
        {editable ? (
          <div
            className={`flex bg-secondary w-10 aspect-square items-center justify-center rounded-full ${
              disabled ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <i className=" bi bi-pencil-square"></i>
          </div>
        ) : null}
      </div>
      <div className="h-[1px] bg-dark" />
      {children}
    </div>
  );
}

export default function Page() {
  const { user } = useUserStore();

  return (
    <div className="spaced-t">
      <h1 className="text-6xl whitespace-pre-line text-light font-ranille">
        Hi {user?.name} ✨
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spaced-md spaced-t-md">
        <Card editable title={`Personal\nInformation`}>
          <div className="flex flex-col gap-spaced-xs">
            <p className="font-gopher text-lg md:text-2xl font-light">
              {user?.name}
            </p>
            <p className="font-gopher text-lg md:text-2xl font-light">
              {user?.email}
            </p>
          </div>
        </Card>
        <Card editable title={`Shipping\nAddress`}>
          <div className="flex flex-col gap-spaced-xs">
            <p className="font-gopher text-lg md:text-2xl">
              Western Nautical Highway Oriental Mindoro - San Teodoro - Ilag
            </p>
            <p className="font-gopher text-sm md:text-lg font-light">5202</p>
            <p className="font-gopher text-sm md:text-lg font-light">
              +639291746419
            </p>
          </div>
        </Card>
        <Card editable title={`Billing\nAddress`} disabled>
          <div className="flex flex-col gap-spaced-sm">
            <form className="bg-secondary spaced-sm rounded w-fit">
              <div className="flex gap-spaced-xs spaced-x-sm">
                <input type="checkbox" name="same" id="" checked />
                <label htmlFor="same" className="">
                  <Label>Same as Shipping Address</Label>
                </label>
              </div>
            </form>
            <div className="flex flex-col gap-spaced-xs">
              <p className="font-gopher text-lg md:text-2xl">
                Western Nautical Highway Oriental Mindoro - San Teodoro - Ilag
              </p>
              <p className="font-gopher text-sm md:text-lg font-light">5202</p>
              <p className="font-gopher text-sm md:text-lg font-light">
                +639291746419
              </p>
            </div>
          </div>
        </Card>
        <Card
          className="col-span-1 md:col-span-2 lg:col-span-3"
          title={`Your\nOrders`}
        >
          <Orders />
        </Card>
      </div>
    </div>
  );
}
