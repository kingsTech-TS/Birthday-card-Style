import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/mongodb"
import { Slide } from "../../../../models/Slide"


// GET all slides
export async function GET() {
  await connectDB()
  const slides = await Slide.find().sort({ createdAt: 1 })
  return NextResponse.json(slides)
}

// POST a new slide
export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const slide = await Slide.create(body)
  return NextResponse.json(slide)
}
