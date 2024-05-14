"use client";

import { SimpleButton } from "@/components/common/button";
import { Input } from "@/components/common/forms/input";
import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const createNew = params.id === "new";

  const { addresses, getAddresses, updateAddress, createAddress } =
    useOrdersStore();
  const { user, updateMe } = useUserStore();

  const address = addresses.find((address) => address._id === params.id);
  const isDefaultShipping = user?.defaults.address.shipping === params.id;
  const isDefaultBilling = user?.defaults.address.billing === params.id;

  const setDefaultAddress = (address: "billing" | "shipping") => {
    updateMe(
      JSON.parse(
        JSON.stringify({
          defaults: {
            address: {
              ...user?.defaults.address,
              [address]: params.id,
            },
          },
        })
      )
    );
  };

  let action;
  if (createNew) {
    action = createAddress;
  } else {
    action = updateAddress;
  }

  useEffect(() => {
    if (!addresses.length) {
      getAddresses();
    }
  }, []);

  return (
    <div>
      {!createNew ? (
        <div className="flex gap-spaced-md">
          {isDefaultShipping ? (
            <div className="rounded spaced-y-sm spaced-x-md bg-light w-fit">
              <Label>Default Shipping Address</Label>
            </div>
          ) : null}
          {isDefaultBilling ? (
            <div className="rounded spaced-y-sm spaced-x-md bg-light w-fit">
              <Label>Default Billing Address</Label>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex gap-spaced-md spaced-y">
        <SimpleButton className="bg-danger" onClick={() => router.back()}>
          Cancel
        </SimpleButton>
        {!createNew ? (
          <>
            {!isDefaultShipping ? (
              <SimpleButton
                className="bg-light"
                onClick={() => setDefaultAddress("shipping")}
              >
                Set as Default Shipping Address
              </SimpleButton>
            ) : null}
            {!isDefaultBilling ? (
              <SimpleButton
                className="bg-light"
                onClick={() => setDefaultAddress("billing")}
              >
                Set as Default Billing Address
              </SimpleButton>
            ) : null}
          </>
        ) : null}
      </div>
      <form action={action} className="flex flex-col gap-spaced-sm">
        <input name="_id" value={address?._id} className="hidden" />
        <input
          type="text"
          placeholder="Address"
          name="address"
          defaultValue={address?.address}
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          name="zip"
          defaultValue={address?.zip}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          defaultValue={address?.phone}
          required
        />
        <SimpleButton className="bg-light" type="submit">
          Save
        </SimpleButton>
      </form>
    </div>
  );
}
