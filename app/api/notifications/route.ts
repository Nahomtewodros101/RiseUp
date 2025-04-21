import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware, getCurrentUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request, ["admin"]);
    if (authResult) {
      return authResult;
    }

    const data = await request.json();
    const {
      message,
      type,
      scheduled,
      scheduledDate,
      targetAudience,
      isPriority,
    } = data;

    if (!message || !type) {
      return NextResponse.json(
        { error: "Message and type are required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        type,
        scheduled,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        targetAudience,
        isPriority,
        createdBy: user.id,
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      include: { creator: { select: { name: true } } },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
