import { useOrdersStore } from "@/state/orders";
import { ChangeEvent, useEffect, useState } from "react";

function Quantity({ item, quantity }: { item: ProductItem; quantity: number }) {
  const { updateCartItemQuantity, addToCart, deleteCartItem, isLoading } =
    useOrdersStore();

  const [count, setCount] = useState<number>(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  return (
    <div className="flex flex-col">
      <button
        disabled={isLoading}
        className="h-[40px] md:h-[30px] disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => addToCart(item._id, 1)}
      >
        <i className="bi bi-caret-up-fill text-light"></i>
      </button>
      <form
        action={updateCartItemQuantity}
        onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
          if (count === 0) {
            e.preventDefault();
            deleteCartItem(item._id);
          }
        }}
      >
        <input
          type="text"
          name="product-id"
          id=""
          value={item._id}
          className="hidden"
        />
        <input
          disabled={isLoading}
          type="text"
          name="quantity"
          value={count}
          className="w-14 h-[60px] md:h-[40px] bg-[transparent] text-center text-3xl disabled:opacity-50 disabled:pointer-events-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const re = /^[0-9\b]+$/;

            if (e.target.value === "" || re.test(e.target.value)) {
              setCount(Number(e.target.value));
            }
          }}
        />
        <button type="submit" className="hidden"></button>
      </form>
      <button
        disabled={isLoading}
        className="h-[40px] md:h-[30px] disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => addToCart(item._id, -1)}
      >
        <i
          className={`bi bi-caret-down-fill text-light ${
            quantity === 1 ? "text-danger" : ""
          }`}
        ></i>
      </button>
    </div>
  );
}

export function CartItem({
  item,
  quantity,
  color,
}: {
  item: ProductItem;
  quantity: number;
  color?: Colors;
}) {
  const totalAmount = quantity * item.amount;

  return (
    <>
      <tr className="font-merchant text-light *:border-2 border-light ">
        <td>
          <div className="w-[100px] h-[140px] md:h-[100px] flex-shrink-0"></div>
        </td>
        <td className="w-[100%] spaced-sm text-3xl !leading-[0.8em]">
          <div className="flex flex-col md:flex-row md:items-center gap-spaced-sm">
            {item?.details?.name} {item.name ? `- ${item?.name}` : null}
            {item?.attributes?.map((attribute, index) => {
              return (
                <div
                  key={index}
                  className="uppercase text-[0.7em] tracking-widest spaced-x-sm bg-light rounded-[10px] text-dark w-fit"
                >
                  {attribute.value}
                </div>
              );
            })}
          </div>
        </td>
        <td>
          <Quantity item={item} quantity={quantity} />
        </td>
        <td className=" uppercase text-3xl spaced-sm">
          P{totalAmount.toFixed(2)}
        </td>
      </tr>
    </>
  );
}
