import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Slide from "../../../../models/Slide";


// GET all slides
export async function GET() {
  try {
    await connectDB();
    const slides = await Slide.find().sort({ createdAt: 1 }); // oldest → newest
    return NextResponse.json(slides);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}

// POST new slide
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const slide = await Slide.create(body);
    return NextResponse.json(slide, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save slide" }, { status: 500 });
  }
}
