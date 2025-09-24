import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Wish from "../../../../models/Wish";
;

export async function GET() {
  await connectDB();
  const wishes = await Wish.find().sort({ createdAt: -1 });
  return NextResponse.json(wishes);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, message } = await req.json();

  const colors = ["bg-primary/20", "bg-secondary/20", "bg-accent/20", "bg-pink-200/50", "bg-purple-200/50"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const newWish = await Wish.create({ name, message, color });
  return NextResponse.json(newWish);
}
