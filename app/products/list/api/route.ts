export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const id = searchParams.get('id')
  const res = await fetch(`${process.env.BASE_URL}/products/list`);
  const productList = await res.json();

  //   console.log(productList);

  return Response.json({ ...productList });
}
