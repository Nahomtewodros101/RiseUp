import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    
    let totalUsers = 0;
    let activeUsers = 0;

    try {
      totalUsers = await db.user.count();

      activeUsers = await db.user.count({
        where: {
          lastLogin: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });
    } catch (dbError) {
      console.error("Database error when counting users:", dbError);
    }

    return NextResponse.json({
      totalUsers,
      activeUsers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        totalUsers: 0,
        activeUsers: 0,
        error: "Failed to fetch user count",
      },
      { status: 200 }
    );
  }
}
