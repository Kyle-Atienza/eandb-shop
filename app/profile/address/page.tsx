"use client";

import { SimpleButton } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { addresses, getAddresses } = useOrdersStore();
  const { user } = useUserStore();

  const isDefaultShipping = (id: string) =>
    user?.defaults.address.shipping === id;
  const isDefaultBilling = (id: string) =>
    user?.defaults.address.billing === id;

  useEffect(() => {
    getAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="rounded-md bg-light max-h-[500px] overflow-auto relative">
        <table className="w-full font-gopher ">
          <thead className="sticky top-0 bg-light">
            <tr>
              <th className="spaced-x-sm spaced-y-xs "></th>
              <th className="spaced-x-sm spaced-y-xs text-start">
                <Label className="font-normal">Address</Label>
              </th>
              <th className="spaced-x-sm spaced-y-sm text-start">
                <Label className="font-normal">Zip</Label>
              </th>
              <th className="spaced-x-sm spaced-y-sm text-start">
                <Label className="font-normal">Phone</Label>
              </th>
              <th className="spaced-x-sm spaced-y-sm "></th>
            </tr>
          </thead>
          {addresses.length ? (
            <tbody>
              {addresses.map((address, index) => {
                const selected: boolean =
                  address._id === user?.defaults.address.shipping;

                return (
                  <tr
                    className={`transition-colors hover:bg-secondary ${
                      isDefaultShipping(address._id) ||
                      isDefaultBilling(address._id)
                        ? "bg-secondary"
                        : null
                    }`}
                    key={index}
                  >
                    <td className="spaced-sm">
                      <div className="flex flex-col gap-spaced-xs">
                        {isDefaultShipping(address._id) ? (
                          <div className="text-xs border-2 rounded-sm spaced-y-xs spaced-x-sm font-gopher bg-secondary w-fit border-light">
                            Shipping
                          </div>
                        ) : null}
                        {isDefaultBilling(address._id) ? (
                          <div className="text-xs border-2 rounded-sm spaced-y-xs spaced-x-sm font-gopher bg-secondary w-fit border-light">
                            Billing
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="spaced-sm">{address.address}</td>
                    <td className="spaced-sm">{address.zip}</td>
                    <td className="spaced-sm">{address.phone}</td>
                    <td className="spaced-sm">
                      <SimpleButton
                        onClick={() =>
                          router.push(`/profile/address/edit/${address._id}`)
                        }
                        className="border-2 bg-secondary border-light"
                      >
                        Edit
                      </SimpleButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
      <div className="spaced-t">
        <SimpleButton
          onClick={() => router.push(`/profile/address/edit/new`)}
          className="bg-light"
        >
          Add Address
        </SimpleButton>
      </div>
    </div>
  );
}
