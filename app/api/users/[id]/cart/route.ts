import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDatabase } from "@/app/api/db";

type ShoppingCart = Record<string, string[]>;
// Simulated shopping cart data

const carts: ShoppingCart = {
  "1": ["123", "345"],
  "2": ["345"],
  "3": ["123"],
};
type Params = {
  id: string;
};
// This route handles fetching the cart for a specific user by their ID
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDatabase();
  const userId = params.id;
  const userCart = await db.collection("carts").findOne({ userId });

  if (!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProducts = await db.collection("products").find({
    id: { $in: userCart.cartIds },
  }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type CartBody = {
  productId: string;
};
// This route handles adding a product to the user's cart

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
    const { db } = await connectToDatabase();


  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $push: { cartIds: productId } },
    { returnDocument: "after", upsert: true }
  );
  const cartProducts = await db.collection("products").find({
    id: { $in: updatedCart.cartIds },
  }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// This route handles deleting a product from the user's cart

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
    const { db } = await connectToDatabase();
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: "after" }
  );
  if(!updatedCart) {
    return new Response(JSON.stringify([]), {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
}
  const cartProducts = await db.collection("products").find({
    id: { $in: updatedCart.cartIds },
  }).toArray();


  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
