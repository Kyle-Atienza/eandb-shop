"use client";

import { SimpleButton } from "@/components/common/button";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { addresses, getAddresses } = useOrdersStore();
  const { user } = useUserStore();

  const isDefaultShipping = (id: string) =>
    user?.defaults.address.shipping._id === id;
  const isDefaultBilling = (id: string) =>
    user?.defaults.address.billing._id === id;

  useEffect(() => {
    getAddresses();
  }, []);

  console.log(addresses);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Address</th>
            <th>Zip</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => {
            const selected: boolean =
              address._id === user?.defaults.address.shipping._id;

            return (
              <tr key={index}>
                <td>
                  <div className="flex flex-col gap-spaced-xs">
                    {isDefaultShipping(address._id) ? (
                      <div className="text-xs rounded-sm spaced-y-xs spaced-x-sm font-gopher bg-light w-fit">
                        Shipping
                      </div>
                    ) : null}
                    {isDefaultBilling(address._id) ? (
                      <div className="text-xs rounded-sm spaced-y-xs spaced-x-sm font-gopher bg-light w-fit">
                        Billing
                      </div>
                    ) : null}
                  </div>
                </td>
                <td>{address.address}</td>
                <td>{address.zip}</td>
                <td>{address.phone}</td>
                <td>
                  <SimpleButton
                    onClick={() =>
                      router.push(`/profile/address/edit/${address._id}`)
                    }
                    className="bg-light"
                  >
                    Edit
                  </SimpleButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SimpleButton
        onClick={() => router.push(`/profile/address/edit/new`)}
        className="bg-light"
      >
        Add Address
      </SimpleButton>
    </div>
  );
}
