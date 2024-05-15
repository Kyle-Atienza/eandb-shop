"use client";

import { SimpleButton } from "@/components/common/button";
import { Input, Switch } from "@/components/common/forms/input";
import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { getFormData } from "@/utils/formData";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactEventHandler, useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const createNew = params.id === "new";

  const {
    addresses,
    getAddresses,
    updateAddress,
    createAddress,
    deleteAddress,
  } = useOrdersStore();
  const { user, updateMe } = useUserStore();

  const address = addresses.find((address) => address._id === params.id);
  const isDefaultShipping = user?.defaults.address.shipping === params.id;
  const isDefaultBilling = user?.defaults.address.billing === params.id;

  const setDefaultAddress = (address: "billing" | "shipping") => {
    updateMe(
      getFormData({
        defaults: {
          address: {
            ...user?.defaults.address,
            [address]: params.id,
          },
        },
      })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      console.log("back");
    }
  }, [addresses.length]);

  const remove = () => {
    deleteAddress(params.id);
    router.back();
  };

  return (
    <div className="flex flex-col gap-spaced-md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-spaced-md">
          <Switch
            label="Shipping Addresss"
            className="bg-secondary"
            labelClassName="text-light"
            checked={isDefaultShipping}
            onClick={() => setDefaultAddress("shipping")}
          />
          <Switch
            label="Billing Addresss"
            className="bg-secondary"
            labelClassName="text-light"
            checked={isDefaultBilling}
            onClick={() => setDefaultAddress("billing")}
          />
        </div>
        <div className="flex items-start gap-spaced-sm">
          <SimpleButton onClick={remove} className="bg-danger w-fit">
            Delete Address
          </SimpleButton>
        </div>
      </div>
      <form
        action={(data) => {
          action(data);
          router.back();
        }}
        className="flex flex-col gap-spaced-sm"
      >
        <input name="_id" value={address?._id} className="hidden" />
        <div className="grid grid-cols-3 gap-spaced-md">
          <Input
            type="text"
            className="bg-light !text-dark"
            labelClassName="text-light"
            label="Address"
            name="address"
            defaultValue={address?.address}
            required
          />
          <Input
            type="text"
            className="bg-light !text-dark"
            labelClassName="text-light"
            label="Zip Code"
            name="zip"
            defaultValue={address?.zip}
            required
          />
          <Input
            type="text"
            className="bg-light !text-dark"
            labelClassName="text-light"
            label="Phone Number"
            name="phone"
            defaultValue={address?.phone}
            required
          />
        </div>
        <SimpleButton className="bg-light w-fit" type="submit">
          {createNew ? "Create Address" : "Save Address"}
        </SimpleButton>
      </form>
    </div>
  );
}
