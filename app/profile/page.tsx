"use client";

import { Button, SimpleButton } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { Orders } from "@/components/pages/profile/orders";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Address({ address }: { address: OrderAddress }) {
  return (
    <div className="flex flex-col gap-spaced-xs">
      <p className="font-gopher text-lg md:text-xl font-light bg-[transparent]">
        {address.address}
      </p>
      <Label>{address.zip}</Label>
      <Label>{address.phone}</Label>
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
  const { addresses, getAddresses } = useOrdersStore();

  const shippingAddress = addresses.find(
    (address) => address._id === user?.defaults.address.shipping
  );
  const billingAddress = addresses.find(
    (address) => address._id === user?.defaults.address.billing
  );

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spaced-md">
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
        <Card
          editPage="profile/address"
          className="lg:col-span-2"
          title={`Address\nBook`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-spaced-md">
            <div className="flex flex-col">
              <div className="flex flex-col overflow-hidden border-2 rounded-sm text-md font-gopher border-secondary">
                <div className="spaced-sm bg-secondary">Shipping Address</div>
                <div className="spaced-sm">
                  {shippingAddress ? (
                    <Address address={shippingAddress} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col overflow-hidden border-2 rounded-sm text-md font-gopher border-secondary">
                <div className="spaced-sm bg-secondary">Billing Address</div>
                <div className="spaced-sm">
                  {billingAddress ? <Address address={billingAddress} /> : null}
                </div>
              </div>
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
