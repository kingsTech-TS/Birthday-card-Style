import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { Wish } from "../../../../models/Wish";


// GET all wishes
export async function GET() {
  await connectDB();
  const wishes = await Wish.find().sort({ createdAt: -1 });
  return NextResponse.json(wishes);
}

// POST new wish
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const colors = [
    "bg-gradient-to-br from-pink-100 to-pink-200",
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-green-100 to-green-200",
    "bg-gradient-to-br from-yellow-100 to-yellow-200",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newWish = await Wish.create({
    name: body.name,
    message: body.message,
    color: randomColor,
  });

  return NextResponse.json(newWish);
}
