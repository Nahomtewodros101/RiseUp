import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract the dynamic ID from the URL

  // Assuming ID is extracted from the URL, let's check it
  if (id) {
    return NextResponse.json({ message: `Received ID: ${id}` });
  } else {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
