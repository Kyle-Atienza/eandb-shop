import { SimpleButton } from "@/components/common/button";

const getAddresses = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/address`);
  return res.json();
};

export default async function Page() {
  const addresses = await getAddresses();

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
      </table>
      <SimpleButton>Add Address</SimpleButton>
    </div>
  );
}
