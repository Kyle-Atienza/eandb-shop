"use client";

import Cart, { CartItem, CartItems } from "@/components/cart";
import { Button, TransitionButton } from "@/components/common/button";
import { Input, TextArea } from "@/components/common/forms/input";
import { Select } from "@/components/common/forms/select";
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
        <h1 className="text-5xl font-ranille text-light">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_2fr] gap-spaced spaced-y">
          <div className="flex flex-col gap-spaced">
            {/* <h1 className="text-5xl font-ranille text-light">Checkout</h1> */}
            <div className="spaced bg-light rounded flex flex-col gap-spaced-md">
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
            {/* <div className="spaced bg-light rounded flex flex-col gap-spaced-md">
            <Label>Payment</Label>
            <Select options={paymentMethods} />
          </div> */}
            <div className="spaced bg-light rounded flex flex-col gap-spaced-md">
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
          <div className="flex flex-col gap-spaced w-full">
            {/* <h1 className="text-5xl font-ranille text-light">Order Items</h1> */}
            <div className="bg-light w-full rounded spaced md:h-[55vh] overflow-scroll lg:flex">
              <CartItems />
            </div>
            <div className=" w-full">
              <Button
                className="w-full flex justify-center"
                onClick={() => router.push("/checkout/success")}
              >
                Confirm
              </Button>
            </div>
          </div>
          {/* <div className="h-full w-[1px] bg-light"></div>
        <div className=" flex justify-center">
          <div className="flex flex-col mt-5 w-full h-min items-center justify-center">
            <div className="flex items-center w-full">
              <Receipt />
            </div>
            <Button
              className="mt-16"
              onClick={() => router.push("/checkout/success")}
            >
              Confirm
            </Button>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}

export function Old() {
  return (
    <div className="flex">
      <div className="w-2/5 bg-light">
        Your Cart
        <Cart />
      </div>
      <div className="w-3/5">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="email"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Metro Manila, Philippines"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <Link href={"checkout/success"}>
          <button className="self-start p-2 bg-dark text-light">Pay</button>
        </Link>
      </div>
    </div>
  );
}

{
  /* <div className="grid grid-cols-[auto_20%_20%] h-full spaced-b">
<div className="border-2 col-start-1 col-span-2 row-start-1 rounded border-light"></div>
<div className="col-start-2 col-span-2 row-start-1 bg-light my-auto zigzag-top zigzag-bottom relative"></div>
</div> */
}
