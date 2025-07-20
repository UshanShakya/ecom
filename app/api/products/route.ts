import { connectToDatabase } from "@/app/api/db";

export async function GET() {

  const { db } = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  if (!products) {
    return new Response(JSON.stringify({ error: "No products found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
 }