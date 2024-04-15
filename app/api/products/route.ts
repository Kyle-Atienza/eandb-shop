import { useProductsStore } from "@/state/products";
import { NextResponse } from "next/server";

const API_URL = `${process.env.BASE_URL}/products`;

export async function GET() {
  const res = await fetch(`${API_URL}/`);
  const data = await res.json();

  // console.log(data);

  return Response.json({ data });
}
