"use client";

import { Button, SimpleButton } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { Orders } from "@/components/pages/profile/orders";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Address({ address }: { address: OrderAddress }) {
  return (
    <div className="flex flex-col gap-spaced-sm">
      <p className="font-gopher text-lg md:text-2xl font-light bg-[transparent]">
        {address.address}
      </p>
      <p className="font-gopher text-sm md:text-lg font-light bg-[transparent]">
        {address.zip}
      </p>
      <p className="font-gopher text-sm md:text-lg font-light bg-[transparent]">
        {address.phone}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
  edit,
  editable,
  className,
  editPage,
}: {
  title: string;
  edit?: boolean;
  editable?: boolean;
  children: React.ReactNode;
  className?: string;
  editPage?: string;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div
      className={`bg-light spaced-md rounded-md flex flex-col gap-spaced-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <Label className="whitespace-pre-line">
          <span className="leading-[1.2em]">{title}</span>
        </Label>
        {editPage ? (
          <SimpleButton
            onClick={() => router.push(editPage)}
            className="bg-secondary"
          >
            Edit
          </SimpleButton>
        ) : null}
      </div>
      <div className="h-[1px] bg-dark" />
      {children}
    </div>
  );
}

export default function Page() {
  const { user } = useUserStore();

  const [isSameAddress, setIsSameAddress] = useState(
    user?.defaults.address.billing._id === user?.defaults.address.shipping._id
  );

  return (
    <div className="spaced-t">
      <h1 className="text-6xl whitespace-pre-line text-light font-ranille">
        Hi {user?.name} ✨
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spaced-md spaced-t-md">
        <Card editPage="profile/details" title={`Personal\nInformation`}>
          <div className="flex flex-col gap-spaced-xs">
            <p className="text-lg font-light font-gopher md:text-2xl">
              {user?.name}
            </p>
            <p className="text-lg font-light font-gopher md:text-2xl">
              {user?.email}
            </p>
          </div>
        </Card>
        <Card editPage="profile/address" title={`Address\nBook`}>
          {user ? <Address address={user?.defaults.address.shipping} /> : null}
        </Card>
        {/*  <Card editable title={`Billing\nAddress`} edit={isSameAddress}>
          <div className="flex flex-col gap-spaced-sm">
            {user ? <Address address={user?.defaults.address.billing} /> : null}
            <form className="rounded bg-secondary spaced-sm w-fit">
              <div className="flex gap-spaced-xs spaced-x-sm">
                <input
                  type="checkbox"
                  name="same"
                  id=""
                  checked={isSameAddress}
                />
                <label htmlFor="same" className="">
                  <Label>Same as Shipping Address</Label>
                </label>
              </div>
            </form>
          </div>
        </Card> */}
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
