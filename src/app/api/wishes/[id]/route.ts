import { NextResponse } from "next/server";
import Wish from "../../../../../models/Wish";
import { connectDB } from "../../../../../lib/mongodb";


export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const updated = await Wish.findByIdAndUpdate(
    params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Wish not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
