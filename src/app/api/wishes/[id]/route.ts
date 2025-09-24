import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Wish } from "../../../../../models/Wish";


interface Params {
  params: { id: string };
}

// PATCH → like a wish
export async function PATCH(req: Request, { params }: Params) {
  await connectDB();
  const updated = await Wish.findByIdAndUpdate(
    params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  return NextResponse.json(updated);
}
