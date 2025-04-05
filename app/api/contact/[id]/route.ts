import { NextApiRequest, NextApiResponse } from "next";

type Params = { id: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // Extracting 'id' from the route parameters

  if (typeof id === "string") {
    // Process the 'id' safely
    return res.status(200).json({ message: `Received ID: ${id}` });
  } else {
    // Handle the case where 'id' is invalid or not provided
    return res.status(400).json({ error: "Invalid ID" });
  }
}
