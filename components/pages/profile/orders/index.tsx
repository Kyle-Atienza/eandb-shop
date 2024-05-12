import { Select } from "@/components/common/forms/select";
import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { getCartItemsAmount } from "@/utils/orders";
import { useEffect, useState } from "react";

const status = [
  {
    label: "All",
    value: "All",
  },
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
  const { orders, getOrders } = useOrdersStore();
  const [filter, setFilter] = useState<string>("All");
  const filteredOrders = orders.filter((order) =>
    filter === "All" ? true : order.status === filter
  );

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Select
        className="w-72"
        options={status}
        onChange={(e) => setFilter(e.target.value)}
      />
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
              {filteredOrders.map((order, index) => {
                return (
                  <tr className="" key={index}>
                    <th
                      scope="row"
                      className="py-4 px-2 font-normal whitespace-nowrap text-xl"
                    >
                      {order._id}
                    </th>
                    <td className="py-4 px-2 text-xl">
                      {new Date(order.createdAt).toDateString()}
                    </td>
                    <td className="py-4 px-2 text-xl">{order.items.length}</td>
                    <td className="py-4 px-2 text-xl">
                      P{getCartItemsAmount(order.items).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
