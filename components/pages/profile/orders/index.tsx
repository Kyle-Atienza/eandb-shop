import { Select } from "@/components/common/forms/select";
import { Label } from "@/components/common/label";

const status = [
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "Not processed",
    value: "Not processed",
  },
  {
    label: "Processing",
    value: "Processing",
  },
  {
    label: "Shipped",
    value: "Shipped",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

export function Orders() {
  return (
    <>
      <Select className="w-72 !bg-dark text-light" options={status} />
      <div className="spaced-t-sm">
        <div className="relative overflow-x-auto font-gopher bg-secondary spaced-md rounded-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase">
              <tr>
                <th
                  scope="col"
                  className="font-normal py-4 px-2 whitespace-nowrap"
                >
                  <Label>Order #</Label>
                </th>
                <th
                  scope="col"
                  className="font-normal py-4 px-2 whitespace-nowrap"
                >
                  <Label>Placed On</Label>
                </th>
                <th
                  scope="col"
                  className="font-normal py-4 px-2 whitespace-nowrap"
                >
                  <Label>Items</Label>
                </th>
                <th
                  scope="col"
                  className="font-normal py-4 px-2 whitespace-nowrap"
                >
                  <Label>Total</Label>
                </th>
              </tr>
            </thead>
            <tbody className="*:border-t-[1px]">
              <tr className="">
                <th
                  scope="row"
                  className="py-4 px-2 font-normal text-gray-900 whitespace-nowrap text-xl"
                >
                  Apple MacBook Pro 17
                </th>
                <td className="py-4 px-2">Silver</td>
                <td className="py-4 px-2">Laptop</td>
                <td className="py-4 px-2">$2999</td>
              </tr>
              <tr className="">
                <th
                  scope="row"
                  className="py-4 px-2 font-normal text-gray-900 whitespace-nowrap text-xl"
                >
                  Microsoft Surface Pro
                </th>
                <td className="py-4 px-2">White</td>
                <td className="py-4 px-2">Laptop PC</td>
                <td className="py-4 px-2">$1999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
