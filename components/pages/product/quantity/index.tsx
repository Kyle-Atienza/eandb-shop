import { Label } from "@/components/common/label";

export function ProductQuantity() {
  return (
    <div className="flex flex-col gap-spaced-sm w-min">
      <label htmlFor="flavors" className="text-light">
        <Label>Quantity:</Label>
      </label>
      <div className="flex border-2 rounded-md border-light spaced-sm">
        <button className="transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher">
          +
        </button>
        <input
          className="w-24 text-center bg-base text-light spaced-md"
          defaultValue={1}
          type="text"
          id="quantity"
        />
        <button className="transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher">
          -
        </button>
      </div>
    </div>
  );
}
