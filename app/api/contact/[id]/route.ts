import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); 

  if (id) {
    return NextResponse.json({ message: `Received ID: ${id}` });
  } else {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
