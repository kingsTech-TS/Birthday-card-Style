// import { NextResponse } from "next/server";
// import Wish from "../../../../../models/Wish";
// import { connectDB } from "../../../../../lib/mongodb";
// import mongoose from "mongoose";

// type RouteParams = {
//   params: { id: string };
// };

// export async function PATCH(req: Request, { params }: RouteParams) {
//   await connectDB();

//   if (!mongoose.Types.ObjectId.isValid(params.id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   const updated = await Wish.findByIdAndUpdate(
//     params.id,
//     { $inc: { likes: 1 } },
//     { new: true }
//   );

//   if (!updated) {
//     return NextResponse.json({ error: "Wish not found" }, { status: 404 });
//   }

//   return NextResponse.json(updated);
// }
