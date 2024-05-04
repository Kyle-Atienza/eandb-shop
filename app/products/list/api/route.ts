export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const res = await fetch(`${process.env.BASE_URL}/products/list`);
  const productList = await res.json();

  return Response.json({ ...productList });
}
