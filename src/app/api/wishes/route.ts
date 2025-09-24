import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Wish from "../../../../models/Wish";

export async function GET() {
  try {
    await connectDB();
    const wishes = await Wish.find().sort({ createdAt: -1 });
    return NextResponse.json(wishes, { status: 200 });
  } catch (error) {
    console.error("GET /api/wishes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const colors = [
      "bg-primary/20",
      "bg-secondary/20",
      "bg-accent/20",
      "bg-pink-200/50",
      "bg-purple-200/50",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const newWish = await Wish.create({
      name,
      message,
      color,
      likes: 0,
      createdAt: new Date(),
    });

    return NextResponse.json(newWish, { status: 201 });
  } catch (error) {
    console.error("POST /api/wishes error:", error);
    return NextResponse.json(
      { error: "Failed to create wish" },
      { status: 500 }
    );
  }
}
