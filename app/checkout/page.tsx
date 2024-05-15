"use client";

import Cart, { CartItem, CartItems } from "@/components/cart";
import { Button, TransitionButton } from "@/components/common/button";
import { Input, TextArea } from "@/components/common/forms/input";
import { Select } from "@/components/common/forms/select";
import { HeaderOne } from "@/components/common/header";
import { Label } from "@/components/common/label";
import { Receipt } from "@/components/pages/checkout/receipt";
import { useOrdersStore } from "@/state/orders";
import Link from "next/link";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    label: "Visa",
    value: "Visa",
  },
  {
    label: "GCash",
    value: "GCash",
  },
  {
    label: "Maya",
    value: "Maya",
  },
  {
    label: "Grab Pay",
    value: "Grab Pay",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="spaced-t">
        <HeaderOne>Checkout</HeaderOne>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_2fr] gap-spaced spaced-y">
          <div className="flex flex-col gap-spaced">
            <div className="flex flex-col rounded spaced bg-light gap-spaced-md">
              <Label>Shipping Information</Label>
              <form action="" className="flex flex-col gap-spaced-md">
                <Input
                  placeholder="Shipping address"
                  name="address"
                  id="address"
                />
                <TextArea
                  placeholder="Additional Notes"
                  name="notes"
                  id="notes"
                />
              </form>
            </div>

            <div className="flex flex-col rounded spaced bg-light gap-spaced-md">
              <Label>Cancellation Policy</Label>
              <p className="font-gopher leading-2">
                Our cancellation policy allows cancellations at any time, with
                no fees if made [X] days in advance; cancellations within [Y]
                days may incur a fee of [Z]%. Refunds are processed within
                [number of days] business days to the original payment method.
                Exceptions may apply in unforeseen circumstances, and
                cancellations can be made by [method].
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-spaced">
            <div className="bg-light w-full rounded spaced md:h-[55vh] overflow-scroll lg:flex">
              <CartItems />
            </div>
            <div className="w-full ">
              <Button
                className="flex justify-center w-full"
                onClick={() => router.push("/checkout/success")}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
