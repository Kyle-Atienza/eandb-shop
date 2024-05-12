import { Button, TransitionButton } from "@/components/common/button";
import { Label } from "@/components/common/label";

function ReceiptItem() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start">
        <p>Product</p>
        <p>x1</p>
      </div>
      <p>P100.00</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className=" h-[calc((100vh-300px)/2)]" />
      <div className="flex flex-col justify-centers spaced-x">
        <h1 className="text-6xl text-center whitespace-pre-line text-light font-ranille">
          Thank you for
          {"\n"}
          your purchase 🎉
        </h1>
        <div className="my-8 text-center">
          {/* <h2>
            <Label>
              <span className="text-light">Order Summary</span>
            </Label>
          </h2> */}
          <div className="flex justify-center mx-auto my-12">
            <div className="  bg-light w-[90vw] lg:w-[500px] zigzag-top zigzag-bottom font-merchant text-xl">
              <div className="flex flex-col items-center gap-spaced-md spaced-x">
                <p className="text-3xl font-merchant-wide">Order Summary</p>
                <p>05-05-2024 | 4:51 PM</p>
                <div className="border-t-[1px] w-full border-dark border-dashed" />
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Customer Name:</p>
                  <p className="w-1/2 text-end">John Doe</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Delivery Address:</p>
                  <p className="w-1/2 text-end">
                    Blk 13 Lot 28, Salinas 1, Bacoor City, Cavite
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Additional Notes:</p>
                  <p className="w-1/2 text-end">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Paid Thru:</p>
                  <p className="w-1/2 text-end">GCash</p>
                </div>
                <div className="border-t-[1px] w-full border-dark border-dashed" />

                <ReceiptItem />
                <ReceiptItem />
                <ReceiptItem />
                <div className="border-t-[1px] w-full border-dark border-dashed" />
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Total Amount:</p>
                  <p className="w-1/2 text-end">P100.00</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Delivery Fee:</p>
                  <p className="w-1/2 text-end">P10.00</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="w-1/2 text-start">Grand Total:</p>
                  <p className="w-1/2 text-end">P110.00</p>
                </div>
                <div className="border-t-[1px] w-full border-dark border-dashed" />
                <p className="text-3xl font-merchant-wide">Thank You</p>
              </div>
            </div>
          </div>
          <TransitionButton href="/products/list" className="mt-4">
            Shop More
          </TransitionButton>
        </div>
      </div>
    </div>
  );
}
