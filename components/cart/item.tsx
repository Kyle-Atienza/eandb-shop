import { useOrdersStore } from "@/state/orders";
import { Label } from "../common/label";
import { ProductQuantity } from "../pages/product/quantity";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductsStore } from "@/state/products";

function Quantity({ item, quantity }: { item: ProductItem; quantity: number }) {
  const {
    updateCartItemQuantity,
    addToCart,
    addToLocalCart,
    deleteCartItem,
    isLoading,
  } = useOrdersStore();

  const [count, setCount] = useState<number>(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  return (
    <div className="flex flex-col">
      <button
        disabled={isLoading}
        className="h-[40px] disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => addToLocalCart(item._id, 1)}
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
          className="w-14 h-[60px] bg-[transparent] text-center text-3xl disabled:opacity-50 disabled:pointer-events-none"
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
        className="h-[40px] disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => addToLocalCart(item._id, -1)}
        /* onClick={() =>
          item.count === 1
            ? deleteCartItem(item.product._id)
            : addToCart(item.product._id, -1)
        } */
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
  // const cartItemData =
  const rotation = Math.random() * 18 - 8;
  const totalAmount = quantity * item.amount;
  // const quantity: number = item.count;
  // const attributes = item.product.attributes;

  return (
    <>
      <tr className="font-merchant text-light *:border-2 border-light ">
        <td>
          <div className="w-[100px] h-[140px] flex-shrink-0"></div>
        </td>
        <td className="w-[100%] spaced-sm  text-3xl !leading-[0.8em]">
          <div>
            {item.details.name}
            {item.attributes.map((attribute, index) => {
              return (
                <p key={index}>
                  {attribute.type}: {attribute.value}
                </p>
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
      {/* <tr className="font-merchant text-light *:border-2 border-light ">
        <td rowSpan={attributes.length ? 2 : 1}>
          <div className="w-[100px] h-[140px] flex-shrink-0"></div>
        </td>
        <td className="w-[100%] spaced-sm  text-3xl !leading-[0.8em]">
          <div>
            {item.product.details.name}
            {item.product.name ? ` - ${item.product.name}` : ""}
          </div>
        </td>
        <td rowSpan={attributes.length ? 2 : 1}>
          <Quantity item={item} />
        </td>
        <td
          rowSpan={attributes.length ? 2 : 1}
          className=" uppercase text-3xl spaced-sm"
        >
          P{(item.price * item.count).toFixed(2)}
        </td>
      </tr>
      {attributes.length ? (
        <tr className="font-merchant text-light *:border-2 border-light align-middle h-[30px]">
          <td className=" spaced-sm  text-3xl !leading-[0.8em] bg-light">
            {attributes.length ? (
              <div className="flex justify-center">
                {attributes.length
                  ? attributes.map((attribute, index) => {
                      return (
                        <p
                          key={index}
                          className="text-[1.5rem] tracking-widest text-tertiary uppercase md:text-md"
                        >
                          {attribute.value}
                        </p>
                      );
                    })
                  : null}
              </div>
            ) : null}
          </td>
        </tr>
      ) : null} */}
    </>
  );
}
